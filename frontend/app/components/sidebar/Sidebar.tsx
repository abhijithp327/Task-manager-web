"use client";

import IconCheck from '@/public/icons/IconCheck';
import IconFileCheck from '@/public/icons/IconFileCheck';
import IconGrid from '@/public/icons/IconGrid';
import IconStopwatch from '@/public/icons/IconStopwatch';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';


const Sidebar = () => {

    const pathname = usePathname();

    const getStrokeColor = (link: string) => {

        return pathname === link ? "#3aafae" : "#71717a";
    };

    const navItems = [
        {
          icon: <IconGrid strokeColor={getStrokeColor("/")} />,
          title: "All",
          link: "/",
        },
        {
          icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
          title: "Completed",
          link: "/completed",
        },
        {
          icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
          title: "Pending",
          link: "/pending",
        },
        {
          icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
          title: "Overdue",
          link: "/overdue",
        },
      ];


    return (
        <div className='basis-[5rem] flex flex-col bg-red-500'>

            <div className="flex items-center justify-center h-[5rem]">
                <Image src={"/image/logo.png"} alt="logo" width={28} height={28} />
            </div>

            <div className='mt-8 flex-1 flex flex-col items-center justify-between'>
                <ul className="flex flex-col gap-10">
                    {navItems.map((item, index) => (
                        <li key={index} className='relative group'>
                            <Link href={item.link}>{item.icon}</Link>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default Sidebar;