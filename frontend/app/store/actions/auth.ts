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

};