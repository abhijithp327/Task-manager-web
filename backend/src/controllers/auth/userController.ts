import { Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import getErrorsInArray from "../../utils/joiError";
import { joiOptions } from "../../utils/joiOptions";
import User from "../../models/auth/userModel";
import { generateAccessToken, generateToken, hashToken } from "../../utils/token";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from "../../models/auth/tokenModel";
import { sendEmailVerificationLink, sendPasswordResetSuccessEmail, sendResetPasswordLink } from "../../utils/emailTemplates";

dotenv.config();


interface AuthRequest extends Request {
    user?: { userId: string };
};


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
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0), // Immediately expire the cookie
            path: "/",
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

export const sendVerifyEmail = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const user = await User.findById(userId);


        if (user?.isVerified) {
            res.status(400).json({
                status: 400,
                success: true,
                message: "Email already verified",
            });
            return;
        };

        if (!user) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "User not found",
            });
            return;
        };

        // Remove existing token if any
        await Token.deleteOne({ userId: user._id });

        // create a verification token
        const verificationToken = generateToken();

        const hashedToken = hashToken(verificationToken);

        await Token.create({
            userId: user?._id,
            verificationToken: hashedToken,
            createdAt: Date.now(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        });


        const verificationLink = `${process.env.BASE_URL}/auth/verify/email?token=${verificationToken}`;
        console.log('verificationToken: ', verificationToken);


        // send email
        if (user?.usr_email) {
            await sendEmailVerificationLink(user?.usr_email, verificationLink);
        } else {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Email not found",
            });
            return;
        };

        res.status(200).json({
            status: 200,
            success: true,
            message: "Verification email sent successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to send verification email",
            error: error
        });
    }
};

export const verifyEmail = async (req: Request, res: Response) => {
    try {

        const { verificationToken } = req.params;

        if (!verificationToken) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Invalid verification token",
            });
            return;
        };

        const hashedToken = hashToken(verificationToken);
        // console.log('hashedToken: ', hashedToken);

        const userToken = await Token.findOne({
            verificationToken: hashedToken,
            expiresAt: { $gt: Date.now() }
        });

        if (!userToken) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Invalid or expired verification token",
            });
            return;
        };

        const user = await User.findById(userToken?.userId);

        if (user?.isVerified) {
            res.status(401).json({
                status: 400,
                success: false,
                message: "Email already verified",
            });
            return;
        };

        await User.updateOne({ _id: userToken?.userId }, { isVerified: true });

        // ✅ DELETE THE TOKEN AFTER SUCCESS
        await Token.deleteOne({ _id: userToken._id });

        res.status(200).json({
            status: 200,
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to verify email",
            error: error
        });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {

        const { usr_email } = req.body;

        const schema = Joi.object({
            usr_email: Joi.string().email().required().label("Email"),
        });

        const { error } = schema.validate({ usr_email }, joiOptions);

        if (error) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Validation Error",
                error: getErrorsInArray(error.details),
            });
            return;
        };

        const user = await User.findOne({ usr_email });

        if (!user) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "User not found",
            });
            return;
        };

        // Remove existing token if any
        await Token.deleteOne({ userId: user._id });

        const passwordResetToken = generateToken();
        console.log('passwordResetToken: ', passwordResetToken);

        const hashedToken = hashToken(passwordResetToken);

        await Token.create({
            userId: user._id,
            passwordResetToken: hashedToken,
            createdAt: Date.now(),
            expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiry
        });


        // reset link
        const resetLink = `${process.env.BASE_URL}/auth/reset-password?token=${passwordResetToken}`;

        // send email
        await sendResetPasswordLink(user.usr_email, resetLink);

        res.status(200).json({
            status: 200,
            success: true,
            message: "Password reset link sent successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to send password reset link",
            error: error
        });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {

        const { passwordResetToken } = req.params;
        const { usr_password } = req.body;

        const schema = Joi.object({
            usr_password: Joi.string().required().label("Password"),
        });

        const { error } = schema.validate({ usr_password }, joiOptions);

        if (error) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Validation Error",
                error: getErrorsInArray(error.details),
            });
            return;
        };

        const hashedToken = hashToken(passwordResetToken);

        const userToken = await Token.findOne({
            passwordResetToken: hashedToken,
            expiresAt: { $gt: Date.now() }
        });

        if (!userToken) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Invalid or expired password reset token",
            });
            return;
        };

        const user = await User.findById(userToken?.userId);

        if (!user) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "User not found",
            });
            return;
        };

        const hashPassword = await bcrypt.hash(usr_password, 12);

        await User.findByIdAndUpdate(user._id, { usr_password: hashPassword });

        // ✅ DELETE THE TOKEN AFTER SUCCESS
        await Token.deleteOne({ _id: userToken._id });

        // send email
        await sendPasswordResetSuccessEmail(user.usr_email);

        res.status(200).json({
            status: 200,
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to reset password",
            error: error
        });
    }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
    try {

        const userId = req.user?.userId;

        const { currentPassword, newPassword } = req.body;

        const schema = Joi.object({
            currentPassword: Joi.string().required().label("Current Password"),
            newPassword: Joi.string().required().label("New Password"),
        });

        const { error } = schema.validate({ currentPassword, newPassword }, joiOptions);

        if (error) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Validation Error",
                error: getErrorsInArray(error.details),
            });
            return;
        };

        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "User not found",
            });
            return;
        };

        const isMatch = await bcrypt.compare(currentPassword, user.usr_password as string);

        if (!isMatch) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Current password is incorrect",
            });
            return;
        };

        const hashPassword = await bcrypt.hash(newPassword, 12);

        await User.findByIdAndUpdate(user._id, { usr_password: hashPassword });

        res.status(200).json({
            status: 200,
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to change password",
            error: error
        });

    }
};

export const updateEmail = async (req: AuthRequest, res: Response) => {
    try {

        const userId = req.user?.userId;

        const { usr_email } = req.body;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized request. User ID is missing.",
            });
            return;
        }

        const user = await User.findById(userId);

        // Check if the new email is the same as the current one
        if (user?.usr_email === usr_email) {
            res.status(400).json({
                success: false,
                message: "New email is the same as the current email.",
            });
            return;
        }

        // Check if the email is already in use by another user
        const existingUser = await User.findOne({ usr_email });
        if (existingUser) {
             res.status(400).json({
                success: false,
                message: "This email is already associated with another account.",
            });
            return;
        }

        await User.findByIdAndUpdate(userId, { usr_email: usr_email });

        res.status(200).json({
            status: 200,
            success: true,
            message: "Email updated successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to update email",
            error: error
        });
    }

};

