'use client';
import { RootState, store } from '@/redux/Store';
import { setStateUser } from '@/redux/stateUser/user.state';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function page() {
    // const stateUser = useSelector((state: RootState) => state.reducerUser);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    async function getData() {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            store.dispatch(setStateUser(user));

            setIsLoggedIn(true);
        }
    }

    useEffect(() => {
        getData();

        redirect('/home');
    }, []);
    return <div>Hello world</div>;
}
