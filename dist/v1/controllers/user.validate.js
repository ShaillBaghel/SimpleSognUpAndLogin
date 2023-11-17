"use strict";

var _require = require("express-validator"),
  check = _require.check;
var _require2 = require("../helpers/utils"),
  validationResult = _require2.validationResult;
exports.signup = [check("firstName").exists().not().isEmpty().withMessage("First name is required"), check("lastName").not().isEmpty().withMessage("Last name is required"), check("email").isEmail().withMessage("Email is required"), check("password").isLength({
  min: 8
}).withMessage("Password must be at least 8 characters long"), check("password2").isLength({
  min: 8
}).withMessage("Password must be at least 8 characters long"), function (req, res, next) {
  validationResult(req, res, next);
}];
exports.login = [check("email").isEmail().withMessage("Email is required"), check("password").isLength({
  min: 8
}).withMessage("Password must be at least 8 characters long"), function (req, res, next) {
  validationResult(req, res, next);
}];