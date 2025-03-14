import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import appConfig from "../../config/appConfig";

// Define API response type (adjust based on your API response structure)
interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
}

const instance = axios.create({
    baseURL: appConfig.server?.baseUrl || "",
    withCredentials: true, // Ensure cookies are sent with requests
});

// Request Interceptor: Automatically attach token
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor: Handle errors (No refresh token)
instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => response,
    (error: AxiosError) => {
        console.error("API Error:", error.response?.data || error.message);

        if (error.response?.status === 401) {
            // If unauthorized, remove the token and redirect to login
            Cookies.remove("token");
            window.location.href = "/auth/login"; // Redirect user to login page
        }

        return Promise.reject(error);
    }
);

export default instance;
