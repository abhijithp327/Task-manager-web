import express from "express";
import { getUserProfile, loginUser, logoutUser, registerUser, updateUser } from "../controllers/auth/userController";
import verifyToken from "../middleware/authMiddleware";


const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', verifyToken, getUserProfile);
router.put('/update-user', verifyToken, updateUser);


export default router;