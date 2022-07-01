const express = require('express');
const controller = require("../controllers/user");
var bodyParser = require("body-parser");
const { auth } = require("../middleware/auth");
const validate = require('../controllers/user.validate');
const multer = require('multer');
const upload = multer({ dest: 'images' });

const router = express.Router();

var jsonParser = bodyParser.json();
// signup user
router.post("/signup",jsonParser, validate.signup, controller.signup);

// login user
router.post("/login", jsonParser, validate.login,  controller.login);
//logout user
router.post("/logout", auth, controller.logout);

//upload user avatar
router.post("/me/upload", auth, upload.single("avatar"), controller.uploadAvatar);

module.exports = router;
