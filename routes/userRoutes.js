const express = require("express")
const router = express.Router();    
const User = require("../models/Users.js"); 
const protect = require("../middleware/auth.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;
    const user = new User({name, email, password});
    await user.save();
    res.status(201).send("User registered successfully");
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if(!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).send("Invalid Credentials.");
    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : "1h"});
    res.send({token});
})

router.post("/attendance/mark", protect async (req, res) => {
    
})