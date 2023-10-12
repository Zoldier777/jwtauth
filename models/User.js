const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: [true, "Please enter a username"]
        },
        email: {
            type: String,
            required: [true, "Please enter a valid email address"],
            unique: true,
            match: [ //  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ 
                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                , "please enter a valid email"
            ]
        },
        password : {
            type: String,
            required: [true, "Please add a password"],
            minlength: 6,
            select : false, 
        },
        resetPasswordToken : String,
        resetPasswordExpire : Date
})
UserSchema.pre("save", async function (next) { // middleware to handle encryption when working with User object
    if(!this.isModified("password")){
        next();
    }
    const salt =  await bcrypt.genSalt(10);
    this.password =  await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password) //this.pass is the user model objects' pass which we're comparing against.
}
UserSchema.methods.getSignedToken = function() {
     return jwt.sign({
        id : this._id
     },process.env. JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE})   
}
UserSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // 10 minutes in milliseconds
    return resetToken;
    
}

const User  = mongoose.model("User" , UserSchema);

module.exports = User;