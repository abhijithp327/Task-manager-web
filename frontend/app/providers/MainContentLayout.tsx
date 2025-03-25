"use client";

import React from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';


interface MainContentLayoutProps {
    children: React.ReactNode;
};

interface User {
    userId: string;
};


const MainContentLayout = ({ children }: MainContentLayoutProps) => {

    const user = useSelector((state: RootState) => state.auth.user) as User | null;

    const userId = user?.userId;

    return (
        <main className={`${userId ? 'pr-[20rem]' : ''} pb-[1.5rem] flex h-full`}>
            {children}
        </main>
    )
};

export default MainContentLayout;