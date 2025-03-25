"use client";

import { RootState } from '@/app/store/store';
import React from 'react';
import { useSelector } from 'react-redux';


interface User {
  userId: string;
  usr_name: string;
};

const Header = () => {

  const user = useSelector((state: RootState) => state.auth.user) as User | null;
  console.log('user: ', user);



  return (
    <header className='px-6 my-4 w-full flex items--center justify-between bg-secondary'>

      <div>
        <h1 className='text-lg font-bold'>
          <span role='img' aria-label='wave' className=''>
            👋
          </span>
          {user ? `Hello, ${user?.usr_name}` : 'Welcome to Task Manager'}
        </h1>
        <p className="text-sm">
          {user ? (
            <>
              You have {" "}
              <span className='font-bold text-[#3aafae]'>5</span>
              {" "} active tasks
            </>
          ) : (
            "Please log in or sign up to view your tasks"
          )}
        </p>
      </div>

      <div className="h-[50px] flex items-center gap-[10.4rem]">
        <button
          className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
          hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
        // onClick={() => {
        //   if (userId) {
        //     openModalForAdd();
        //   } else {
        //     router.push("/login");
        //   }
        // }}
        >
          {user ? "Add a new Task" : "Login / Register"}
        </button>

        {/* <div className="flex gap-4 items-center">
          <Link
            href="https://github.com/Maclinz/taskfyer"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {github}
          </Link>
          <Link
            href="https://github.com/Maclinz/taskfyer"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {moon}
          </Link>
          <Link
            href="https://github.com/Maclinz/taskfyer"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {profile}
          </Link>
        </div> */}

      </div>

    </header>
  );
};

export default Header;