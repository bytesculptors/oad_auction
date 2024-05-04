import Sidebar from '@/components/Sidebar';
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row">
            <Sidebar />
            {children}
        </div>
    );
}
