"use client";
import { RootState } from '@/app/store/store';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

interface User {
    userId: string;
    usr_name: string;
    usr_email: string;
    usr_photo: string;
}

const Profile = () => {

    const user = useSelector((state: RootState) => state.auth.user) as User | null;

    return (
        <div className="m-6">
        <div
          className="px-2 py-4 flex items-center gap-3 bg-[#E6E6E6]/20 rounded-[0.8rem]
          hover:bg-[#E6E6E6]/50 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white"
        //   onClick={openProfileModal}
        >
          <div>
            <Image
              src={user?.usr_photo || "https://avatars.githubusercontent.com/u/19819005?v=4"}
              alt="avatar"
              width={70}
              height={70}
              className="rounded-full"
            />
          </div>
          <div>
            <h1 className="flex flex-col text-xl">
              <span className=" font-medium">Hello,</span>
              <span className="font-bold">{user?.usr_name}</span>
            </h1>
          </div>
        </div>
  
        <div className="mt-6 flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-gray-400">
              <p>Total Tasks:</p>
              <p className="pl-4 relative flex gap-2">
                <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]"></span>
                <span className="font-medium text-4xl text-[#333]">
                  5
                </span>
              </p>
            </div>
            <div className="text-gray-400">
              <p>In Progress:</p>
              <p className="pl-4 relative flex gap-2">
                <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-[#3AAFAE] rounded-[5px]"></span>
                <span className="font-medium text-4xl text-[#333]">
                  7
                </span>
              </p>
            </div>
            <div className="text-gray-400">
              <p>Open Tasks:</p>
              <p className="pl-4 relative flex gap-2">
                <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-orange-400 rounded-[5px]"></span>
                <span className="font-medium text-4xl text-[#333]">
                  3
                </span>
              </p>
            </div>
            <div className="text-gray-400">
              <p>Completed:</p>
              <p className="pl-4 relative flex gap-2">
                <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-green-400 rounded-[5px]"></span>
                <span className="font-medium text-4xl text-[#333]">
                 12
                </span>
              </p>
            </div>
          </div>
        </div>
        <h3 className="mt-8 font-medium">Activity</h3>
      </div>
    )
};

export default Profile;