import express from "express";
import { changePassword, forgotPassword, getUserProfile, loginUser, logoutUser, registerUser, resetPassword, sendVerifyEmail, updateEmail, updateUser, userLoginStatus, verifyEmail } from '../controllers/auth/userController';
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
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:passwordResetToken', resetPassword);
router.put('/change-password', verifyToken, changePassword);
router.put('/update-email', verifyToken, updateEmail);

export default router;