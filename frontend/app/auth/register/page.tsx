"use client";

import Link from 'next/link';
import React from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { registerUser } from '@/app/store/features/authSlice';
import { AppDispatch } from '@/app/store/store';
import { useRouter } from "next/navigation";

interface FormData {
    usr_name: string;
    usr_email: string;
    usr_password: string;
    confirm_password: string;
};

interface FormErrors {
    usr_name?: string;
    usr_email?: string;
    usr_password?: string;
    confirm_password?: string;
}

const Register = () => {

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useRouter();

    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);

    const [formData, setFormData] = React.useState<FormData>({
        usr_name: "",
        usr_email: "",
        usr_password: "",
        confirm_password: ""
    });

    const [loading, setLoading] = React.useState<boolean>(false);

    const [formErrors, setFormErrors] = React.useState<FormErrors>({});

    const validateForm = (): boolean => {

        const errors: FormErrors = {}; // Ensure proper type

        if (!formData.usr_name.trim()) errors.usr_name = "Name is required.";

        // Validate email address
        if (!formData.usr_email.trim()) {
            errors.usr_email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.usr_email)) {
            errors.usr_email = "Please enter a valid email address.";
        }

        if (!formData.usr_password.trim()) errors.usr_password = "Password is required.";

        if (formData.usr_password !== formData.confirm_password) {
            errors.confirm_password = "Passwords do not match.";
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0; // Return true if there are no errors
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        // Check if password and confirm password match
        if (formData.usr_password !== formData.confirm_password) {
            toast.error("Passwords do not match. Please make sure both passwords are the same.");
            return;
        };
        setLoading(true);
        try {
            const response = await dispatch(registerUser(formData));
            console.log('response: ', response);
            if (response.payload?.success) {
                toast.success(response.payload.message);
                navigate.push('/auth/login');
            } else {
                toast.error(response.payload.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <section>
            <div className='container px-6 py-12 mx-auto flex justify-center items-center h-screen'>
                <div className='bg-gray-50 p-8 rounded-lg shadow-xl max-w-2xl max-h-[700px] mx-auto'>
                    <div className='flex flex-col gap-5'>

                        <div className='flex flex-col gap-2'>
                            <h1 className='text-2xl font-bold'>Account Register</h1>
                            <p className='text-gray-600 font-normal text-sm'>If you are already a member you can login with your email address and password.</p>
                        </div>

                        <form className="flex flex-col gap-5" onSubmit={handleRegister}>

                            {/* Name */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="usr_name">Name</label>
                                <input
                                    type="text"
                                    name="usr_name"
                                    id="usr_name"
                                    value={formData.usr_name}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    autoComplete="name"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="usr_email">Email</label>
                                <input
                                    type="email"
                                    name="usr_email"
                                    id="usr_email"
                                    value={formData.usr_email}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    autoComplete="email"
                                />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="usr_password">Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="usr_password"
                                        id="usr_password"
                                        value={formData.usr_password}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        autoComplete="new-password"
                                    />
                                    <div
                                        className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <FaRegEyeSlash className="w-5 h-4 text-black" />
                                        ) : (
                                            <FaRegEye className="w-5 h-4 text-black" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="confirm_password">Confirm Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirm_password"
                                        id="confirm_password"
                                        value={formData.confirm_password}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        autoComplete="new-password"
                                    />
                                    <div
                                        className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <FaRegEyeSlash className="w-5 h-4 text-black" />
                                        ) : (
                                            <FaRegEye className="w-5 h-4 text-black" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                className="bg-blue-600 text-white w-full p-2 rounded-md hover:bg-blue-700"
                            >
                                Register
                            </button>
                        </form>


                        <div className='flex flex-col gap-2'>
                            <Link href="/auth/forgot-password" className='text-blue-600 text-sm font-bold hover:text-blue-700 hover:underline'>Forgot password ?</Link>
                        </div>

                        <div>
                            <p className='text-center text-sm font-semibold'>Already have an account? <Link href="/auth/login" className='text-blue-600 text-sm font-bold hover:text-blue-700 hover:underline'>Login here</Link></p>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Register;
