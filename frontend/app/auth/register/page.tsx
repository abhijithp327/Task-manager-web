"use client";

import Link from 'next/link';
import React from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    return (
        <section>
            <div className='container px-6 py-12 mx-auto flex justify-center items-center h-screen'>
                <div className='bg-gray-50 p-8 rounded-lg shadow-xl max-w-2xl max-h-[600px] mx-auto'>
                    <div className='flex flex-col gap-5'>

                        <div className='flex flex-col gap-2'>
                            <h1 className='text-2xl font-bold'>Account Register</h1>
                            <p className='text-gray-600 font-normal text-sm'>If you are already a member you can login with your email address and password.</p>
                        </div>

                        <form className='flex flex-col gap-5' action="">

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="email">Name</label>
                                <input type="text" name="name" id="name" className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600' />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600' />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="password">Password</label>

                                <div className='relative flex items-center'>
                                    <input type={showPassword ? "text" : "password"} name="password" id="password" className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600' />
                                    <div className='absolute right-3 top-3 text-gray-500 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaRegEyeSlash className='w-5 h-4 text-black' /> : <FaRegEye className='w-5 h-4 text-black'/>}
                                    </div>
                                </div>
                            </div>

                        </form>

                        <div className='flex flex-col gap-2'>
                            <button className='bg-blue-600 text-white w-full p-2 rounded-md hover:bg-blue-700'>Login</button>
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
