const Error = require('../utils/errorHandler');

const ErrorHandler = (err, req, res, next)  => {
    let error = { ...err}

    console.log(error)

    error.message = err.message;
    if(err.code === 11000){
        const message = 'Duplicate field value'
        error = new Error(message,400)
    }
    if(err.name === "ValidationError"){
        const message =Object.values(err.errors).map((val) => val.message)
        error =  new Error(message,400)
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "server error"
    })
}
module.exports = ErrorHandler;