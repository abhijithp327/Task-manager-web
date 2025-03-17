"use client";

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { useRouter } from 'next/navigation';
import { logoutUser } from './store/features/authSlice';

const page = () => {

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log('user checking : ', user);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
    } catch (error) {
      console.log(error);
    }
    router.push('/auth/login');
  };

  React.useEffect(() => {
    if (user) {
      router.push('/dashboard');
    } else {
      handleLogout();
    }
  }, [user]);

  return (
    <div className=''>
      hello world
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default page;
