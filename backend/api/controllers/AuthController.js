/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async function (req, res) {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
    
        try {
            const user = await User.create({ email, password: hashedPassword }).fetch();
            const defaultRole = await Role.findOne({ name: 'viewer' });
            if (defaultRole) {
                await User.addToCollection(user.id, 'roles').members([defaultRole.id]);
            }
            return res.status(201).json({ message: "Register successfully", user});
        } catch (err) {
            return res.status(400).json({ error: "Fail to register", details: err.message });
        }
    },

    login: async function (req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email }).populate('roles');

            if (!user) return res.status(404).json({ message: "User not found" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: "Wrong password" });

            const token = jwt.sign({ id: user.id, email: user.email }, sails.config.custom.jwtSecret, { expiresIn: '2h' });
            return res.json({
                message: "Login successfully", 
                token,
                user: {
                    id: user.id,
                    email:user.email,
                    roles: user.roles.map(r => r.name)
                }
            });
        } catch (err) {
            return res.status(500).json({ message: "Fail to login", details: err.message });
        }
    }

};

