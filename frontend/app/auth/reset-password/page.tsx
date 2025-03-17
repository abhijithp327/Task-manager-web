"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import LoadingButton from '@/app/components/buttons/Loadingbutton';
import { forgotPassword, resetPassword } from '@/app/store/features/authSlice';
import toast from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';


interface FormData {
    usr_password: string;
    confirm_password: string
};

interface FormErrors {
    usr_password?: string;
    confirm_password?: string
};


const ResetPassword = () => {

    const dispatch = useDispatch<AppDispatch>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const navigate = useRouter();

    const [loading, setLoading] = React.useState<boolean>(false);

    const [formData, setFormData] = React.useState<FormData>({
        usr_password: "",
        confirm_password: ""
    });

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [formErrors, setFormErrors] = React.useState<FormErrors>({});

    const validateForm = (): boolean => {

        const errors: FormErrors = {};

        if (!formData.usr_password.trim()) errors.usr_password = "Password is required.";

        if (!formData.confirm_password.trim()) errors.confirm_password = "Confirm password is required.";

        if (formData.usr_password !== formData.confirm_password) errors.confirm_password = "Passwords do not match.";

        setFormErrors(errors);

        return Object.keys(errors).length === 0; // Return true if there are no errors
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Check if password and confirm password match
        if (formData.usr_password !== formData.confirm_password) {
            toast.error("Passwords do not match. Please make sure both passwords are the same.");
            return;
        };
        if (!validateForm()) return;
        setLoading(true);
        try {
            const response = await dispatch(resetPassword({ data: formData, token: token! }));
            if (response.payload.success) {
                toast.success(response.payload.message);
                navigate.push('/auth/login');
            } else {
                toast.error(response.payload.message);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <div className='container px-6 py-12 mx-auto flex justify-center items-center h-screen'>
                <div className='bg-gray-50 p-8 rounded-lg shadow-xl max-w-2xl max-h-[600px] mx-auto'>
                    <div className='flex flex-col gap-5'>

                        <div className='flex flex-col gap-2'>
                            <h1 className='text-2xl font-bold'>Reset Password</h1>
                            <p className='text-gray-600 font-normal text-sm'>
                                Enter your new password below to reset your account. If you didn't request this, you can ignore this message.
                            </p>
                        </div>

                        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

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
                                {formErrors.usr_password && <p className="text-red-500 text-sm">{formErrors.usr_password}</p>}
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
                                {formErrors.confirm_password && <p className="text-red-500 text-sm">{formErrors.confirm_password}</p>}
                            </div>

                            {/* Button */}
                            <LoadingButton
                                loading={loading}
                                text="Reset Password"
                                loadingText="Resetting Password..."
                                type="submit"
                            />

                        </form>

                    </div>

                </div>
            </div>
        </section>
    )
};

export default ResetPassword;