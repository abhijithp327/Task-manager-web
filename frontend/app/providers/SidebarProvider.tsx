"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Sidebar from '../components/sidebar/Sidebar';



const SidebarProvider = () => {

  const user = useSelector((state: RootState) => state.auth.user);

  return <>
    {user && <Sidebar />}
  </>

};

export default SidebarProvider;