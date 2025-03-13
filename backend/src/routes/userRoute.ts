import express from "express";
import { getUserProfile, loginUser, logoutUser, registerUser, sendVerifyEmail, updateUser, userLoginStatus, verifyEmail } from '../controllers/auth/userController';
import { verifyToken } from "../middleware/authMiddleware";


const router = express.Router();

// user routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', verifyToken, getUserProfile);
router.put('/update-user', verifyToken, updateUser);
router.put('/verify-email/:verificationToken', verifyEmail);
router.get('/login-status', userLoginStatus);
router.post('/send-email', verifyToken, sendVerifyEmail);

export default router;