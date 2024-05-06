import SideBar, { SidebarProps } from '@/components/Sidebar';
import React from 'react';
import { SiGoogleanalytics } from 'react-icons/si';
import { IoIosCreate } from 'react-icons/io';
import { FaProductHunt } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';

export default function SllerLayout({ children }: { children: React.ReactNode }) {
    const SideBarItems: SidebarProps = {
        sideBarItems: [
            { title: 'Dashboard', address: '/home/seller', Icon: SiGoogleanalytics },
            { title: 'Products', address: '/home/seller/products', Icon: FaProductHunt },
            { title: 'Create', address: '/home/seller/create-product', Icon: IoIosCreate },
            { title: 'Account', address: '/home/seller/account', Icon: MdAccountCircle },
        ],
    };

    return (
        <div className="flex flex-row">
            <SideBar sideBarItems={SideBarItems.sideBarItems} />
            {children}
        </div>
    );
}
