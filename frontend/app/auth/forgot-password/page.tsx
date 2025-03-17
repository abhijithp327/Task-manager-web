"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import LoadingButton from '@/app/components/buttons/Loadingbutton';


interface FormData {
    usr_email: string;
};

interface FormErrors {
    usr_email?: string;
};


const ForgotPassword = () => {

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useRouter();

    const [loading, setLoading] = React.useState<boolean>(false);

    const [formData, setFormData] = React.useState<FormData>({
        usr_email: "",
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            dispatch(forgotPassword(formData));
            navigate.push("/auth/verify");
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
                            <h1 className='text-2xl font-bold'>Forgot Password</h1>
                            <p className='text-gray-600 font-normal text-sm'>
                                Enter your email address and we will send you a link to reset your password
                            </p>
                        </div>

                        <form className="flex flex-col gap-3">

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
                                        required
                                    />
                                    {formErrors.usr_email && <p className="text-red-500 text-sm">{formErrors.usr_email}</p>}
                                </div>
                            </div>

                            {/* Button */}
                            <LoadingButton
                                loading={loading}
                                text="Update Email"
                                loadingText="Sending Link..."
                                type="submit"
                            />

                        </form>



                    </div>

                </div>
            </div>
        </section>
    )
};

export default ForgotPassword;