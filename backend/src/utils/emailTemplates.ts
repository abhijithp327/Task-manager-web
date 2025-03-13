import dotenv from "dotenv";
import { sendMail } from "../helper/nodeMailConfig";

dotenv.config();

// send forgot password link
export const sendEmailVerificationLink = async (email: string, verificationLink: string): Promise<void> => {

    const emailData = {
        from: process.env.FROM_GMAIL as string,
        email: email,
        subject: "Task Manager - Email Verification",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                .container {
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                .header {
                    background-color: #336d24;
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    padding: 20px;
                    text-align: center;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-top: 20px;
                    font-size: 16px;
                    background-color: #1F9700;
                    color: #fff !important;
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    color: #666;
                    font-size: 12px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Email Verification Required</h2>
                </div>
                <div class="content">
                    <p>Hello,</p>
                    <p>Thank you for signing up for Task Manager! Please verify your email address by clicking the button below:</p>
                    <a href="${verificationLink}" class="button">Verify Email</a>
                    <p>If you did not sign up for Task Manager, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>This is an automated message. Please do not reply to this email.</p>
                </div>
            </div>
        </body>
        </html>
    `,
    };

    try {
        await sendMail(emailData);
    } catch (error) {
        throw new Error(`Failed to send verification email: ${error}`);
    }
};

// send forgot password link
export const sendResetPasswordLink = async (email: string, resetLink: string): Promise<void> => {
    const emailData = {
        from: process.env.FROM_GMAIL as string,
        email: email,
        subject: "Task Manager - Password Reset Request",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                .container {
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                .header {
                    background-color: #d9534f;
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    padding: 20px;
                    text-align: center;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-top: 20px;
                    font-size: 16px;
                    background-color: #d9534f;
                    color: #fff !important;
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                }
                .footer {
                    margin-top: 20px;
                    text-align: center;
                    color: #666;
                    font-size: 12px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Password Reset Request</h2>
                </div>
                <div class="content">
                    <p>Hello,</p>
                    <p>We received a request to reset your password. Click the button below to set a new password:</p>
                    <a href="${resetLink}" class="button">Reset Password</a>
                    <p>If you did not request this, please ignore this email or contact support if you have concerns.</p>
                </div>
                <div class="footer">
                    <p>This is an automated message. Please do not reply to this email.</p>
                </div>
            </div>
        </body>
        </html>
    `,
    };

    try {
        await sendMail(emailData);
    } catch (error) {
        throw new Error(`Failed to send password reset email: ${error}`);
    }
};

