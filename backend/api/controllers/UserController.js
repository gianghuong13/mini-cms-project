/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    find: async function (req, res) {
        try {
            const users = await User.find().populate('roles');
            return res.json({ users });
        } catch (err) {
            return res.status(500).json({ 
                error: "Fail to find users",
                details: err.message
            })
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
    }

};

