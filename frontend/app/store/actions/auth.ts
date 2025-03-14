import { send } from 'process';
import Axios from '../axiosInstance/axiosInstance';
import { sendEmailVerificationLink } from '../../../../backend/src/utils/emailTemplates';


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

};