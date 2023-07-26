const { User } = require("../models");
require("dotenv").config();

module.exports = {
    // GET: /api/users/verify
    async verifyUser(req, res) {
        if (!req.session || !req.session.userId) {
            return res.status(401).json({ msg: "unauthorized" });
        }

        const user = await User.findOne({ where: { id: req.session.userId } });
        if (!user) return res.status(401).json({ msg: "unauthorized" });

        return res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
        });
    },

    // GET: /api/users/:userId
    async getUserById(req, res) {
        try {
            const user = await User.findOne({
                where: { id: req.params.userId },
            });
            if (!user) return res.status(404).json({ message: "User not found" });
            return res.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "An error occurred while retrieving user data",
            });
        }
    },

    async createUser(req, res) {
        const userToInsert = {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        };

        try {
            const user = await User.create(userToInsert);

            if (!user) {
                return res.status(400).json({ message: "Unable to create user" });
            }

            req.session.userId = user.id;

            res.status(200).json({
                id: user.id,
                email: user.email,
                username: user.username,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "There was an error while creating the user", details: error.message });
        }
    },

    // UPDATE PUT api/users/:id
    async updateUser(req, res) {
        const { body, params } = req;
        if (!req.session || !req.session.userId || req.session.userId != params.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        let userToUpdate = {
            email: body.email,
            username: body.username,
            profileImage: body.profileImage,
        };

        if (body.password?.length) {
            userToUpdate = { ...userToUpdate, password: body.password };
        }

        const user = await User.update(userToUpdate, {
            where: { id: params.id },
            returning: true,
        });

        if (!user) return res.status(400).json({ message: "Unable to update user" });

        res.status(200).json({
            id: user[0],
            username: user[1].username,
            email: user[1].email,
            profileImage: user[1].profileImage,
        });
    },

    // POST: api/users/auth
    async authUser(req, res) {
        const { body } = req;
        const user = await User.findOne({ where: { email: body.email } });

        if (!user) return res.status(400).json({ message: "Unable to authenticate user" });

        const isValid = await user.isValidPassword(body.password);
        if (!isValid) return res.status(400).json({ message: "Unable to authenticate user" });

        req.session.userId = user.id;

        res.json(user);
    },

    //  /users/logout
    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to log out" });
            }
            res.clearCookie("connect.sid", { path: "/" });
            res.status(200).json({ message: "Logged out successfully" });
        });
    },
};
