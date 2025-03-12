import { Request, Response } from "express"
import Joi from "joi";
import bcrypt from "bcrypt";
import getErrorsInArray from "../../utils/joiError";
import { joiOptions } from "../../utils/joiOptions";
import User from "../../models/auth/userModel";
import { generateAccessToken } from "../../utils/token";




export const registerUser = async (req: Request, res: Response) => {
    try {
        const { usr_name, usr_email, usr_password } = req.body;

        const schema = Joi.object({
            usr_name: Joi.string().required().label("Full Name"),
            usr_email: Joi.string().email().required().label("Email"),
            usr_password: Joi.string().required().label("Password"),
        });

        const { error } = schema.validate({ usr_name, usr_email, usr_password }, joiOptions);

        if (error) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Validation Error",
                error: getErrorsInArray(error.details),
            });
            return;
        }

        const existingUser = await User.findOne({ usr_email });
        if (existingUser) {
            res.status(409).json({
                status: 409,
                success: false,
                message: "User already exists",
            });
            return;
        };

        const hashPassword = await bcrypt.hash(usr_password, 12);

        const newUser = await User.create({
            usr_name,
            usr_email,
            usr_password: hashPassword,
        });

        const token = generateAccessToken({
            ...newUser.toObject(),
            userId: newUser._id.toString()
        });

        res.cookie('token', token, {
            httpOnly: true, // Prevents JavaScript access to the cookie
            secure: process.env.NODE_ENV === 'production', // Only sends cookie over HTTPS in production
            sameSite: 'strict', // Protects against CSRF
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
        });

        res.status(201).json({
            status: 201,
            success: true,
            message: "User created successfully",
            result: {
                userId: newUser._id,
                usr_name,
                usr_email,
                usr_role: newUser.usr_role,
                usr_photo: newUser.usr_photo,
                usr_bio: newUser.usr_bio,
                isVerified: newUser.isVerified,
                token
            },
        });

    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to create user",
            error: error
        });
    }
};



