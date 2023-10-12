const errorHandler = require('../utils/errorHandler')
const User = require("../models/User");
const sendEmail = require('../utils/sendEmails');
const crypto = require('crypto');
const { response } = require('express');

exports.register = async (req, res, next) => {
    const {username, email, password} = req.body;
    try {
        const user = await User.create({
            username, email, password 
        })  
        sendToken(user,201,res);
    } catch (error) {
        next(error);
    }
}
exports.login = async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password){
        return next(new errorHandler("please provide a email and password",400)) 
    }
    try {
       const user = await User.findOne({ email }).select("+password");
       if(!user) {
        return next(new errorHandler("Invalid credentials",401))   
        }
        const isMatch = await user.matchPasswords(password);
        if(!isMatch) {
            return next(new errorHandler("Invalid credentials",401)) 
        }
        sendToken(user,200,res);
    } catch (error) {   
        res.status(500).json({
            success: false,
            error: "User not found"
        });        
    } 
}

exports.forgotpassword = async (req, res, next) => {
    const {email} = req.body
    try {
        const user = await User.findOne({email});
        if(!user){
            next(new errorHandler("User not found",404));
        }
        const resetToken = user.getResetPasswordToken();
        await user.save();
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
        const message = `
        <h1> You have requrested a passwordreset </h1>
        <p> Please go to this link to reset your password</p>
        <a  href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;
        try {
            await sendEmail({
                to: user.email,
                subject: "PasswordReset",
                text : message
            })
            res.status(200).json({
                success: true,
                data: "Email sent"
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return next(new errorHandler("Email could not be sent", 500))
        }
        
    } catch (error) {
        return next(error); 
    }

}
exports.resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.reset_token).digest("hex");
    
    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
    
      if (!user) {
        return next(new errorHandler("Invalid Token", 400));
      }
  
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save();
  
      res.status(201).json({
        success: true,
        token: user.getSignedToken(),
        data: "nice",
      });
    } catch (err) {
      next(err);
    }
  };


const sendToken = (user,statusCode, res) => {
    const token = user.getSignedToken()
    res.status(statusCode).json({
        success : true,
        token
    })
}