import { Request, Response } from "express";
import User from "../../models/auth/userModel";

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
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