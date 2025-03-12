import express from "express";
import { verifyAdmin, verifyCreator, verifyToken } from "../middleware/authMiddleware";
import { deleteUser, getAllUsers } from "../controllers/auth/adminController";


const router = express.Router();

// user routes
router.delete('/delete-user/:userId', verifyToken, verifyAdmin, deleteUser);
router.get('/get-all-users', verifyToken, verifyCreator, getAllUsers)


export default router;