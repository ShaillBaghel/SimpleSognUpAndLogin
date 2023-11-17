const {validationResult} = require('express-validator');

exports.validationResult = (req, res, next) => {
   	try {
		validationResult(req).throw();
		if (req.body.email) {
			req.body.email = req.body.email.toLowerCase();
		}
		return next();
	} catch (err) {
		return res.status(201).json(this.handleErrorRes(err));
	}
};

exports.handleErrorRes = (err, clientAES) => {
	// Prints error in console
	if (process.env.SITE_ENV === "localhost") {
		console.log(err);
	}
	const error = { ...err, message: err.message, code: err.code || 401 };
	// Sends error to user
	
	if(error){
		return {status: "fail", error : error.errors[0].msg};
		console.log("code",error);
	}
	
};