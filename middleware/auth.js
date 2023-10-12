const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler'); 


exports.protect =  async (req,res,next) => {
    let token;
    if(req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")) {
        
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return next(new ErrorHandler("Authorization required to access requested route", 401))
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user =  await User.findById(decoded.id);
        if(!user){
           return next(new ErrorHandler("User does not exist", 404))
        }
        req.user = user;
        next();
        
    } catch (error) {
        return next(new ErrorHandler("Not authorized", 401 ))

    }
}
