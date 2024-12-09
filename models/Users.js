const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name : String,
    email : {type : String, unique : true},
    password : String,
    profilePicture : String,
    attendance : [
        {
            data : Date,
            status : {
                type : String, enum : ["Present", "Absent", "Leave"], default : "Absent"
            }
        }
    ],
    leaveRequest : [
        {
            date : Date,
            reason : String,
            status : {
                type : String, enum : ["Approved", "Rejected", "Pending"], default : "Pending"
            }
        }
    ]
});

userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

module.exports = mongoose.model("User", userSchema);