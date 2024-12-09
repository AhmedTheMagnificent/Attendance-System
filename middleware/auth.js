const jwt = require("jsonwebtoken");
const User = require("../models/Users.js");

const protect = async (req, res, next) => {
    try{
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        if(!req.user) throw new Error();
        next
    } catch(error){
        res.status(401).send({
            error : "Please Authenticate. "
        });
    }
};

module.exports = protect;