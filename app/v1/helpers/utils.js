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