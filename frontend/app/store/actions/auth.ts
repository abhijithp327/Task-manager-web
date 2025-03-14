import Axios from '../axiosInstance/axiosInstance';


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

};