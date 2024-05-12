import SideBar, { SidebarProps } from '@/components/Sidebar';
import React from 'react';
import { SiGoogleanalytics } from 'react-icons/si';
import { MdManageAccounts } from 'react-icons/md';
import { FaProductHunt } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import { Footer, Navbar } from '@/components';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const SideBarItems: SidebarProps = {
        sideBarItems: [
            { title: 'Dashboard', address: '/home//admin', Icon: SiGoogleanalytics },
            { title: 'Users', address: '/home/admin/account-management', Icon: MdManageAccounts },
            { title: 'Products', address: '/home/admin/product-management', Icon: FaProductHunt },
            { title: 'Approve', address: '/home/admin/approve', Icon: TiTick },
            { title: 'Account', address: '/home/admin/account', Icon: MdAccountCircle },
        ],
    };

    return (
        <div className="flex flex-row">
            <SideBar sideBarItems={SideBarItems.sideBarItems} />
            {children}
        </div>
    );
}
