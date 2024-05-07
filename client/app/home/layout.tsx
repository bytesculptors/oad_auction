'use client';
import { Footer, Navbar } from '@/components';
import { RootState } from '@/redux/Store';
import React from 'react';
import { useSelector } from 'react-redux';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const stateUser = useSelector((state: RootState) => state.reducerUser);
    return (
        <div>
            <Navbar isLoggin={stateUser._id === '' ? false : true} name={stateUser.name} />
            {children}
            <Footer />
        </div>
    );
}
