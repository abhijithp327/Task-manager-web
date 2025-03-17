import { send } from 'process';
import Axios from '../axiosInstance/axiosInstance';
import { sendEmailVerificationLink } from '../../../../backend/src/utils/emailTemplates';
import { verify } from 'crypto';
import { forgotPassword, resetPassword, verifyEmail } from '../../../../backend/src/controllers/auth/userController';
import { logout } from '../features/authSlice';


export const auth = {

    register: async (data: any) => {
        try {
            const response = await Axios.post("user/register", data);
            return response;
        } catch (error: any) {
            console.error("Error registering user:", error);
            return error.response;
        }
    },

    login: async (data: any) => {
        try {
            const response = await Axios.post("user/login", data);
            return response;
        } catch (error: any) {
            console.error("Error logging in user:", error);
            return error.response;
        }
    },

    getUserDetails: async () => {
        try {
            const response = await Axios.get("user/profile");
            return response;
        } catch (error: any) {
            console.error("Error getting user details:", error);
            return error.response;
        }
    },

    sendEmailVerificationLink: async () => {
        try {
            const response = await Axios.post("user/send-email");
            return response;
        } catch (error: any) {
            console.error("Error sending email verification link:", error);
            return error.response;
        }
    },

    updateUserEmail: async (data: any) => {
        try {
            const response = await Axios.put("user/update-email", data);
            return response;
        } catch (error: any) {
            console.error("Error updating user email:", error);
            return error.response;
        }
    },

    verifyEmail: async (data: any) => {
        try {
            const response = await Axios.put(`user/verify-email/${data}`);
            return response;
        } catch (error: any) {
            console.error("Error verifying email:", error);
            return error.response;
        }
    },

    logoutUser: async () => {
        try {
            const response = await Axios.post("user/logout");
            return response;
        } catch (error: any) {
            console.error("Error logging out user:", error);
            return error.response;
        }
    },

    forgotPassword: async (data: any) => {
        try {
            const response = await Axios.post("user/forgot-password", data);
            return response;
        } catch (error: any) {
            console.error("Error forgot password:", error);
            return error.response;
        }
    },

    resetPassword: async (data: any, token: string) => {
        try {
            const response = await Axios.post(`user/reset-password/${token}`, data);
            return response;
        } catch (error: any) {
            console.error("Error reset password:", error);
            return error.response;
        }
    },

};