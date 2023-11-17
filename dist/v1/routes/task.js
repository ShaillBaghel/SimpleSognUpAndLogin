"use strict";

var express = require('express');
var controller = require("../controllers/task");
var bodyParser = require("body-parser");
var validate = require('../controllers/task.validate');
var _require = require("../middleware/auth"),
  auth = _require.auth;
var jsonParser = bodyParser.json();
var router = new express.Router();
router.post('/createTask', jsonParser, auth, validate.createTask, controller.createTask);
router.get('/getTasks', jsonParser, auth, controller.getTasks);
router.get('/getTask/:id', jsonParser, auth, controller.getTaskById);
router["delete"]('/deleteTask/:id', jsonParser, auth, controller.deleteTask);
router.patch('/updateTask/:id', jsonParser, auth, controller.updateTask);
module.exports = router;