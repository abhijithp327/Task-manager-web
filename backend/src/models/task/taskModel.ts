import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

    tsk_title: {
        type: String,
        required: true
    },

    tsk_description: {
        type: String,
        default: "No description"
    },

    tsk_due_date: {
        type: Date,
        default: Date.now(),
    },

    tsk_status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },

    tsk_completed: {
        type: Boolean,
        default: false
    },

    tsk_priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low"
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

},
    {
        timestamps: true,
        minimize: true
    });

const Task = mongoose.model("Task", taskSchema);

export default Task;