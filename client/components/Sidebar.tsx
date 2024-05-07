import React from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';

interface SidebarItemProps {
    title: string;
    address: string;
    Icon: IconType;
}

const SideBarItem = ({ title, Icon, address }: SidebarItemProps) => {
    return (
        <Link href={address}>
            <span className="flex flex-row gap-2 mt-6 p-3 md:px-7 cursor-pointer w:36 md:w-60 border-b-2 hover:bg-slate-500 rounded-md items-center justify-center ">
                <Icon className="text-2xl text-white  hidden md:inline " />
                <h1 className="text-gray-300 origin-left font-medium text-xl ">{title}</h1>
            </span>
        </Link>
    );
};

export interface SidebarProps {
    sideBarItems: SidebarItemProps[];
}

export default function Sidebar({ sideBarItems }: SidebarProps) {
    return (
        <div className="w-50 md:w-72 h-screen bg-blue-500">
            <div className="flex flex-col gap-x-4 items-center justify-center">
                {sideBarItems.map((sideBarItem, index) => (
                    <SideBarItem Icon={sideBarItem.Icon} address={sideBarItem.address} title={sideBarItem.title} />
                ))}
            </div>
        </div>
    );
}
