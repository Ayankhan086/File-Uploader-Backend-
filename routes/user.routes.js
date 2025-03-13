const express = require("express");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth.js");
const File = require("../models/files.model.js");



router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register",
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('password').trim().isLength({ min: 5 }),
    body("username").trim().isLength({ min: 3 }),
    async (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {

            const { username, email, password } = req.body;
            const hash_password = await bcrypt.hash(password, 10);
            const newUser = await userModel.create({
                username,
                email,
                password: hash_password
            });

            const userFiles = await File.find({
                user: newUser.userId
            })

            return res.render('Home', { file: userFiles })

        } else {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data"
            });
        }
    });

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", auth,
    body('username').trim().isLength({ min: 3 }),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                const { username, password } = req.body;
                const user = await userModel.findOne({ username: username });

                if (!user) {
                    return res.status(400).json({ message: "username or password is incorrect" });
                }

                const match = await bcrypt.compare(password, user.password);

                if (!match) {
                    return res.status(400).json({ message: "username or password is incorrect" });
                }

                const token = jwt.sign({
                    userId: user._id,
                    email: user.email,
                    username: user.username
                }, process.env.JWT_SECRET);

                res.cookie("token", token)

                const userFiles = await File.find({
                    user: req.user.userId
                })

                return res.render('Home', { file: userFiles })


            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        } else {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data"
            });
        }
    }
);

module.exports = router;