const {check}=require("express-validator");
const {validationResult}=require("../helpers/utils");

exports.createTask = [
    check("name").exists().not().isEmpty().withMessage("Name is required"),
    check("description").exists().not().isEmpty().withMessage("Description is required"),
    check("completed").exists().not().isEmpty().withMessage("Completed is required"),
    (req, res, next) => {
        validationResult(req, res, next);
    }
];

