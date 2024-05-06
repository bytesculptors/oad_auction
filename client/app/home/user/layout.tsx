import SideBar, { SidebarProps } from '@/components/Sidebar';
import React from 'react';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { FaProductHunt } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const SideBarItems: SidebarProps = {
        sideBarItems: [
            { title: 'Products', address: '/home/user', Icon: FaProductHunt },
            { title: 'Deposit', address: '/home/user/deposit', Icon: MdAccountCircle },
            { title: 'Account', address: '/home/user/account', Icon: MdAccountCircle },
        ],
    };

    return (
        <div className="flex flex-row">
            <SideBar sideBarItems={SideBarItems.sideBarItems} />
            {children}
        </div>
    );
}
