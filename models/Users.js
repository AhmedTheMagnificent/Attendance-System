const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : String,
    email : {type : String, unique : true},
    password : String,
    profilePicture : String,
    attendance : [
        {data : Date, status : String}
    ],
    leaveRequest : [
        {date : Date, reason : String, status : String}
    ]
});

module.exports = mongoose.model("User", userSchema);