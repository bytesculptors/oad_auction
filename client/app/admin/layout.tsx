import SideBar, { SidebarProps } from '@/components/Sidebar';
import React from 'react';
import { SiGoogleanalytics } from 'react-icons/si';
import { MdManageAccounts } from 'react-icons/md';
import { FaProductHunt } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const SideBarItems: SidebarProps = {
        sideBarItems: [
            { title: 'Dashboard', address: '/admin', Icon: SiGoogleanalytics },
            { title: 'Users', address: '/admin/account-management', Icon: MdManageAccounts },
            { title: 'Products', address: '/admin/product-management', Icon: FaProductHunt },
            { title: 'Account', address: '/admin/account', Icon: MdAccountCircle },
        ],
    };

    return (
        <div className="flex flex-row">
            <SideBar sideBarItems={SideBarItems.sideBarItems} />
            {children}
        </div>
    );
}
