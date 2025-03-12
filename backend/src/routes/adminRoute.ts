import express from "express";
import { verifyAdmin, verifyToken } from "../middleware/authMiddleware";
import { deleteUser } from "../controllers/auth/adminController";


const router = express.Router();

// user routes
router.delete('/delete-user/:userId', verifyToken, verifyAdmin, deleteUser);


export default router;