import express from "express";
import { getUserProfile, loginUser, logoutUser, registerUser, updateUser, userLoginStatus } from "../controllers/auth/userController";
import { verifyToken } from "../middleware/authMiddleware";


const router = express.Router();

// user routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', verifyToken, getUserProfile);
router.put('/update-user', verifyToken, updateUser);
router.get('/login-status', userLoginStatus);


export default router;