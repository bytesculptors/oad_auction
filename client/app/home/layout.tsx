'use client';
import { Footer, Navbar } from '@/components';
import { RootState, store } from '@/redux/Store';
import { setStateUser } from '@/redux/stateUser/user.state';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const stateUser = useSelector((state: RootState) => state.reducerUser);
    async function getData() {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            store.dispatch(setStateUser(user));
        }
    }

    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <Navbar isLoggin={stateUser._id === '' ? false : true} name={stateUser.name} role={stateUser.role} />
            {children}
            <Footer />
        </div>
    );
}
