"use client";

import React from 'react';
import LoadingButton from '@/app/components/buttons/Loadingbutton';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import { AppDispatch } from '@/app/store/store';
import { getUserDetails, sendVerificationLink, updateEmail } from '@/app/store/features/authSlice';
import { FaEdit } from "react-icons/fa";
import toast from 'react-hot-toast';

interface FormData {
    usr_email: string;
};

interface FormErrors {
    usr_email?: string;
};

const Verify = () => {

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useRouter();

    const [loading, setLoading] = React.useState<boolean>(false);

    const [formData, setFormData] = React.useState<FormData>({
        usr_email: "",
    });

    const [isEditing, setIsEditing] = React.useState<boolean>(false);

    const [formErrors, setFormErrors] = React.useState<FormErrors>({});

    const validateForm = (): boolean => {

        const errors: FormErrors = {};

        // Validate email address
        if (!formData.usr_email.trim()) {
            errors.usr_email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.usr_email)) {
            errors.usr_email = "Please enter a valid email address.";
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0; // Return true if there are no errors
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    React.useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await dispatch(getUserDetails());
                if (response.payload.success) {
                    setFormData({
                        usr_email: response.payload.result.usr_email
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserDetails();
    }, []);

    const handleUpdateEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        setIsEditing(false);
        try {
            const response = await dispatch(updateEmail(formData));
            console.log('response: ', response);
            if (response.payload.success) {
                toast.success(response.payload.message);
            } else {
                toast.error(response.payload.message);
                setIsEditing(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendVerificationLink = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await dispatch(sendVerificationLink());
            if (response.payload.success) {
                toast.success(response.payload.message);
                navigate.push('/auth/verify/success');
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
                <div className='bg-gray-50 p-8 rounded-lg shadow-xl max-w-2xl max-h-[600px] mx-auto'>
                    <div className='flex flex-col gap-5'>

                        <div className='flex flex-col gap-2'>
                            <h1 className='text-2xl font-bold'>Verify your email</h1>
                            <p className='text-gray-600 font-normal text-sm'>
                                To continue, please check your email for a verification link. Once verified, you can log in and access your account.
                            </p>
                        </div>

                        <form className="flex flex-col gap-3" onSubmit={isEditing ? handleUpdateEmail : handleSendVerificationLink}>

                            {/* Email */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="usr_email">Email</label>
                                <div className='relative'>
                                    <input
                                        type="email"
                                        name="usr_email"
                                        id="usr_email"
                                        value={formData.usr_email}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        autoComplete="email"
                                        disabled={!isEditing}
                                    />
                                    <div className="absolute right-3 top-3 text-gray-500 cursor-pointer" onClick={() => setIsEditing(!isEditing)}>
                                        <FaEdit className="w-5 h-4" />
                                    </div>
                                </div>
                                {!isEditing && (
                                    <p className="text-xs text-red-500 mt-1">You cannot edit this email. Click the edit icon if you need to update it.</p>
                                )}
                            </div>

                            {/* Conditional Button */}
                            {isEditing ? (
                                <LoadingButton
                                    loading={loading}
                                    text="Update Email"
                                    loadingText="Updating..."
                                    type="submit"
                                />
                            ) : (
                                <LoadingButton
                                    loading={loading}
                                    text="Send Verification Link"
                                    loadingText="Sending..."
                                    type="submit"
                                />
                            )}

                        </form>



                    </div>

                </div>
            </div>
        </section>
    );
};

export default Verify;