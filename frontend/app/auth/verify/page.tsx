"use client";

import React from 'react';
import LoadingButton from '@/app/components/buttons/Loadingbutton';

interface FormData {
    usr_email: string;
};

interface FormErrors {
    usr_email?: string;
};

const Verify = () => {

    const [loading, setLoading] = React.useState<boolean>(false);

    const [formData, setFormData] = React.useState<FormData>({
        usr_email: ""
    });

     const [formErrors, setFormErrors] = React.useState<FormErrors>({});
    
        const validateForm = (): boolean => {
    
            const errors: FormErrors = {};
    
            // Validate email address
            if (!formData.usr_email.trim()) {
                errors.usr_email = "Email address is required.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.usr_email)) {
                errors.usr_email = "Please enter a valid email address.";
            }
    
            if (!formData.usr_password.trim()) errors.usr_password = "Password is required.";
    
            setFormErrors(errors);
    
            return Object.keys(errors).length === 0; // Return true if there are no errors
        };

    const handleSendVerificationLink = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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

                        <form className="flex flex-col gap-3" onSubmit={handleSendVerificationLink}>

                            {/* Email */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="usr_email">Email</label>
                                <input
                                    type="email"
                                    name="usr_email"
                                    id="usr_email"
                                    placeholder="Enter your email address"
                                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    autoComplete="email"
                                />
                            </div>

                            {/*  Button */}
                            <LoadingButton
                                loading={loading}
                                text="Send Verification Link"
                                loadingText="Sending..."
                                type="submit"
                            />

                        </form>



                    </div>

                </div>
            </div>
        </section>
    );
};

export default Verify;