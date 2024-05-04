import React from 'react';
import { SiGoogleanalytics } from 'react-icons/si';
import { MdManageAccounts } from 'react-icons/md';
import { FaProductHunt } from 'react-icons/fa';
import { IconType } from 'react-icons';
import Link from 'next/link';

interface SidebarItemProps {
    title: string;
    address: string;
    Icon: IconType;
}

const SidebarItem = ({ title, Icon, address }: SidebarItemProps) => {
    return (
        <Link href={address}>
            <span className="flex flex-row gap-2 mt-6 p-3 md:px-7 cursor-pointer hover:bg-slate-500 rounded-md ">
                <Icon className="text-2xl text-white  hidden md:inline" />
                <h1 className="text-gray-300 origin-left font-medium text-xl ">{title}</h1>
            </span>
        </Link>
    );
};

export default function Sidebar() {
    return (
        <div className="w-50 md:w-72 h-screen bg-purple-950">
            <div className="flex flex-col gap-x-4 items-center justify-center">
                <SidebarItem Icon={SiGoogleanalytics} address={'/admin'} title="Dashboard" />
                <SidebarItem Icon={MdManageAccounts} address={'/admin/account-management'} title="Accounts" />
                <SidebarItem Icon={FaProductHunt} address={'/admin/product-management'} title="Products" />
            </div>
        </div>
    );
}
