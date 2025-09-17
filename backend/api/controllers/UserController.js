/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt');

module.exports = {
    find: async function (req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            // const search = req.query.search || '';

            // const whereClause = search ? { email: { contains: search.toLowerCase() } } : {};

            const filterableFields = ['email', 'name', 'roles'];
            const whereClause = {};
            for (const field of filterableFields) {
                if (req.query[field] !== undefined && req.query[field] !== '') {
                    const value = req.query[field];
                    whereClause[field] = { contains: value.toLowerCase() };
                }
            }
            
            const usersRaw = await User.find({
                where: whereClause,
                skip,
                limit,
                sort: 'createdAt DESC'
            }).populate('roles');

            const users = usersRaw.map(user => ({
                ...user,
                roles: user.roles.map(role => role.name)
            }));

            const total = await User.count({ where: whereClause });

            return res.json({
                users,
                total
            });
        } catch (err) {
            return res.status(500).json({ 
                error: "Fail to find users",
                details: err.message
            })
        }
    },

    findOne: async function (req, res) {
        try {
            const user = await User.findOne({ id: req.params.id }).populate('roles');
            if (!user) return res.status(404).json({ message: "User not found" });
            return res.json({
                ...user,
                roles: user.roles.map(role => role.name)
            });
        } catch (err) {
            return res.status(500).json({ 
                error: "Fail to find user",
                details: err.message
            });
        }
    },

    create: async function (req, res) {
        const { email, password, name, roles } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ email, password: hashedPassword, name: name }).fetch();
            const defaultRole = await Role.findOne({ name: 'viewer' });
            const role = await Role.findOne({ name: roles });
            if (role) {
                await User.addToCollection(user.id, 'roles').members([role.id]);
            } else if (defaultRole) {
                await User.addToCollection(user.id, 'roles').members([defaultRole.id]);
            }
            return res.status(201).json({ message: "User created successfully", user });
        } catch (err) {
            return res.status(400).json({ error: "Fail to create user", details: err.message });
        }
    },

    update: async function (req, res) {
        const { email, name, password, roles } = req.body;
        const userId = req.params.id;
        if (!email || !userId) {
            return res.status(400).json({ error: "Email and userId are required" });
        }
        try {
            const role = await Role.findOne({ name: roles });
            if (!role) {
                return res.status(404).json({ error: "Role not found" });
            }
            const updateData = { email, name };
            if (password) {
                updateData.password = await bcrypt.hash(password, 10);
            }

            const updatedUser = await User.updateOne({ id: userId }).set(updateData);
            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }

            
            await User.replaceCollection(userId, 'roles').members([role.id]);
            
            return res.json({
                message: "User updated successfully",
                user: updatedUser
            });
        } catch (err) {
            return res.status(500).json({ 
                error: "Fail to update user", 
                details: err.message 
            });
        }
    },

    destroy: async function (req, res) {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        try {
            const deletedUser = await User.destroyOne({ id: userId });
            if (!deletedUser) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.json({ message: "User deleted successfully" });
        } catch (err) {
            return res.status(500).json({ 
                error: "Fail to delete user", 
                details: err.message 
            });
        }
    },

    assignRole: async function (req, res) {
        const { userId, roleId } = req.body;

        if (!userId || !roleId) {
            return res.status(400).json({ message: "Missing userId or roleId" });
        }

        try {
            const user = await User.findOne({ id: userId });
            const role = await Role.findOne({ id: roleId });

            if (!user || !role) {
                return res.status(404).json({ message: "User or role not found" });
            }

            await User.addToCollection(userId, 'roles').members([roleId]);

            return res.status(200).json({ message: "Role assigned successfully" });
        } catch (err) {
            return res.status(500).json({ message: "Error assigning role", details: err.message });
        }
    },


};

