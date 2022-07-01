const { default: mongoose, Schema } = require("mongoose");

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
}
, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task
