"use strict";

var express = require('express');
var controller = require("../controllers/user");
var bodyParser = require("body-parser");
var _require = require("../middleware/auth"),
  auth = _require.auth;
var validate = require('../controllers/user.validate');
var multer = require('multer');
var upload = multer({
  limit: {
    fileSize: 1000000
  }
});
var router = express.Router();
var jsonParser = bodyParser.json();
// signup user
router.post("/signup", jsonParser, validate.signup, controller.signup);

// login user
router.post("/login", jsonParser, validate.login, controller.login);
//logout user
router.post("/logout", auth, controller.logout);

//upload user avatar
router.post("/me/upload", auth, upload.single("avatar"), controller.uploadAvatar);

//get user avatar
router.get("/me/:id/avatar", controller.getAvatar);

//get all users
router.get("/users", controller.getAllUsers);
module.exports = router;