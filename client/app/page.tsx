'use client';
import { RootState } from '@/redux/Store';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function page() {
    const stateUser = useSelector((state: RootState) => state.reducerUser);
    useEffect(() => {
        if (stateUser._id === '') {
            redirect('/login');
        }
    });
    return <div>Hello world</div>;
}
