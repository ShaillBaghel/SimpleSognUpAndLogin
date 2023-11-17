"use strict";

var _require = require("express-validator"),
  check = _require.check;
var _require2 = require("../helpers/utils"),
  validationResult = _require2.validationResult;
exports.createTask = [check("name").exists().not().isEmpty().withMessage("Name is required"), check("description").exists().not().isEmpty().withMessage("Description is required"), check("completed").exists().not().isEmpty().withMessage("Completed is required"), function (req, res, next) {
  validationResult(req, res, next);
}];