"use strict";

var express = require('express');
var router = express.Router();
router.use('/user', require('./user'));
router.use('/task', require('./task'));
module.exports = router;