"use strict";

var _require = require("mongoose"),
  mongoose = _require["default"],
  Schema = _require.Schema;
var TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    "default": false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
}, {
  timestamps: true
});
var Task = mongoose.model('Task', TaskSchema);
module.exports = Task;