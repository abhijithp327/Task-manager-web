import { Request, Response } from "express";
import User from "../../models/auth/userModel";

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            status: 200,
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to delete user",
            error: error
        });
    }
};


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-usr_password');
        res.status(200).json({
            status: 200,
            success: true,
            message: "Users fetched successfully",
            result: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to fetch users",
            error: error
        });
    }
};