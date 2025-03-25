"use client";

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logoutUser } from '../store/features/authSlice';
import { useRouter } from 'next/navigation';


const Dashboard = () => {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const user = useSelector((state: RootState) => state.auth.user);
    console.log('user redux: ', user);

      const handleLogout = async () => {
        try {
          const response = await dispatch(logoutUser());
          console.log('response: ', response);
        } catch (error) {
          console.log(error);
        }
        router.push('/auth/login');
      };

    return (
        <section>
            {/* <h1>Dashboard</h1>

            <button onClick={handleLogout}>Logout</button> */}
        </section>
    );
};

export default Dashboard;