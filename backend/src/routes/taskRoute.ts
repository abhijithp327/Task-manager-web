import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/task/taskController";



const router = express.Router();

router.post('/create-task', verifyToken, createTask);
router.put('/update-task/:taskId', verifyToken, updateTask);
router.get('/get-tasks', verifyToken, getTasks);
router.get('/get-task/:taskId', verifyToken, getTask);
router.delete('/delete-task/:taskId', verifyToken, deleteTask);

export default router;