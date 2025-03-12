import { Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import getErrorsInArray from "../../utils/joiError";
import { joiOptions } from "../../utils/joiOptions";
import User from "../../models/auth/userModel";
import { generateAccessToken } from "../../utils/token";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


interface AuthRequest extends Request {
    user?: { userId: string };
}


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

export const loginUser = async (req: Request, res: Response) => {
    try {

        const { usr_email, usr_password } = req.body;

        const schema = Joi.object({
            usr_email: Joi.string().email().required().label("Email"),
            usr_password: Joi.string().required().label("Password"),
        });

        const { error } = schema.validate({ usr_email, usr_password }, joiOptions);

        if (error) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Validation Error",
                error: getErrorsInArray(error.details),
            });
            return;
        };

        let user = await User.findOne({ usr_email });
        if (!user) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "Invalid email or password",
            });
            return;
        };

        const isPasswordValid = await bcrypt.compare(usr_password, user.usr_password);

        if (!isPasswordValid) {
            res.status(401).json({
                status: 401,
                success: false,
                message: "Invalid email or password",
            });
            return;
        };


        const token = generateAccessToken({
            ...user.toObject(),
            userId: user._id.toString(),
        });


        // Set cookies with appropriate security options
        res.cookie('token', token, {
            httpOnly: true, // Prevents JavaScript access to the cookie
            secure: process.env.NODE_ENV === 'production', // Only sends cookie over HTTPS in production
            sameSite: 'strict', // Protects against CSRF
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in milliseconds
        });


        res.status(200).json({
            status: 200,
            success: true,
            message: "Login successful",
            result: {
                userId: user._id,
                usr_name: user.usr_name,
                usr_email: user.usr_email,
                usr_role: user.usr_role,
                usr_photo: user.usr_photo,
                usr_bio: user.usr_bio,
                isVerified: user.isVerified,
                token
            },
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to login user",
            error: error
        });
    }
};

export const logoutUser = async (req: Request, res: Response) => {
    try {

        // Clear cookies by setting them to empty with immediate expiry
        res.cookie('accessToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0), // Immediately expire the cookie
        });

        res.cookie('refreshToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0),
        });

        res.status(200).json({
            status: 200,
            success: true,
            message: "Logout successful",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to logout",
            error: error,
        });
    }
};

export const getUserProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        const user = await User.findById(userId).select('-usr_password');

        res.status(200).json({
            status: 200,
            success: true,
            message: "User details fetched successfully",
            result: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to fetch user details",
            error: error
        });
    }
};


export const updateUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { usr_name, usr_bio, usr_photo } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, {
            usr_name,
            usr_bio,
            usr_photo
        }, {
            new: true
        }).select('-usr_password');

        res.status(200).json({
            status: 200,
            success: true,
            message: "User details fetched successfully",
            result: updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to fetch user details",
            error: error
        });
    }
};

export const userLoginStatus = async (req: Request, res: Response) => {
    try {

        const token = req.cookies.token;
        // console.log('token: ', token);

        if (!token) {
            res.status(401).json({
                status: 401,
                success: false,
                message: "Not authorized, please login again"
            });
        };
        // console.log("check", process.env.JWT_SECRET as string);
        const decoded = jwt.verify(token, process.env.JWT_ACCESS as string) as JwtPayload;

        if (decoded) {
            res.status(200).json({
                status: 200,
                success: true,
                result: true
            });
            return;
        } else {
            res.status(401).json({
                status: 401,
                success: false,
                result: false
            });
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to fetch user details",
            error: error
        });
    }
};