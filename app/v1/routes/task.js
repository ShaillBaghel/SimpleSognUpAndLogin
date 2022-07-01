const express = require('express');
const controller = require("../controllers/task");
const bodyParser = require("body-parser");
const validate = require('../controllers/task.validate');
const { auth } = require("../middleware/auth");

const jsonParser = bodyParser.json();

const router = new express.Router();

router.post('/createTask', jsonParser, auth, validate.createTask,  controller.createTask);

router.get('/getTasks', jsonParser, auth, controller.getTasks);

router.get('/getTask/:id', jsonParser, auth, controller.getTaskById);

router.delete('/deleteTask/:id', jsonParser, auth, controller.deleteTask);

router.patch('/updateTask/:id', jsonParser, auth, controller.updateTask);

module.exports = router;