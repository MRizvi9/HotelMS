const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
    const newuser = new User(req.body);

    try {
        const user = await newuser.save();
        res.send("User Registered Successfully");
    } catch (error) {
        res.status(400).json({ message: "Something Went Wrong" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email, password: password });  // ❗ temporary only

        if (user) {
            const temp = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            };
            res.status(200).json(temp);
        } else {
            res.status(400).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        res.status(400).json({ message: "Something Went Wrong" });
    }
});


module.exports = router;
