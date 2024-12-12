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
});

router.post("/attendance/mark", protect, async (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const alreadyMarked = req.user.attendance.find(a => a.Date().toISOString().split("T")[0] === today);
    if(alreadyMarked){
        return res.status(400).send("Attendance already marked for today.");
    }
    await req.user.save();
    res.send("Attendance marked");
});

router.get("/attendance/view", protect, (req, res) => {
    res.send(req.user.attendance);
});

router.post("/leave/request", protect, async (req, res) => {
    const { reason } = req.body;
    req.user.leaveRequest.push({reason});
    await req.user.save();
    res.send("Leave request sent");
})

router.post("/profile/update")

module.exports = router;