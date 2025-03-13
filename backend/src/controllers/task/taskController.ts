import { Request, Response } from 'express';
import Joi from 'joi';
import { joiOptions } from '../../utils/joiOptions';
import getErrorsInArray from '../../utils/joiError';
import Task from '../../models/task/taskModel';



interface AuthRequest extends Request {
    user?: { userId: string };
};

export const createTask = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        const { tsk_title, tsk_description, tsk_due_date, tsk_priority, tsk_status } = req.body;

        const schema = Joi.object({
            tsk_title: Joi.string().required(),
        });

        const { error } = schema.validate({ tsk_title }, joiOptions);

        if (error) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Validation Error",
                error: getErrorsInArray(error.details),
            });
            return;
        };

        const task = await Task.create({
            tsk_title,
            tsk_description,
            tsk_due_date,
            tsk_priority,
            tsk_status,
            user: userId
        });

        res.status(201).json({
            status: 201,
            success: true,
            message: "Task created successfully",
            result: task
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to create task",
            error: error
        });
    }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
    try {

        const userId = req.user?.userId;

        const tasks = await Task.find({ user: userId });

        res.status(200).json({
            status: 200,
            success: true,
            message: "Tasks fetched successfully",
            result: {
                count: tasks.length,
                tasks
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to fetch tasks",
            error: error
        });
    }
};

export const getTask = async (req: AuthRequest, res: Response) => {
    try {

        const userId = req.user?.userId;
        const { taskId } = req.params;

        if (!taskId) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Task Id is required"
            });
            return;
        }

        const task = await Task.findOne({ user: userId, _id: taskId });

        res.status(200).json({
            status: 200,
            success: true,
            message: "Tasks fetched successfully",
            result: task
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to fetch tasks",
            error: error
        });
    }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
    try {

        const userId = req.user?.userId;
        const { taskId } = req.params;
        const { tsk_title, tsk_description, tsk_due_date, tsk_priority, tsk_status } = req.body;

        if (!taskId) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Task Id is required"
            });
            return;
        }

        const task = await Task.findOne({ user: userId, _id: taskId });

        if (!task) {
            res.status(404).json({
                success: false,
                message: "Task not found or not authorized"
            });
            return;
        };

        // ✅ Update task & return updated document
        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, user: userId },
            { tsk_title, tsk_description, tsk_due_date, tsk_priority, tsk_status },
            { new: true } // ✅ Returns the updated document
        );

        res.status(200).json({
            status: 200,
            success: true,
            message: "Task updated successfully",
            result: updatedTask
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to update task",
            error: error
        });
    }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
    try {

        const userId = req.user?.userId;
        const { taskId } = req.params;

        if (!taskId) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Task Id is required"
            });
            return;
        }

        const task = await Task.findOne({ user: userId, _id: taskId });

        if (!task) {
            res.status(404).json({
                success: false,
                message: "Task not found or not authorized"
            });
            return;
        }

        // ✅ Delete task
        await Task.findOneAndDelete({ _id: taskId, user: userId });

        res.status(200).json({
            status: 200,
            success: true,
            message: "Task deleted successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to delete task",
            error: error
        });
    }
};



