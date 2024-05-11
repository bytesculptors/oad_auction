'use client';
import { RootState, store } from '@/redux/Store';
import { setStateUser } from '@/redux/stateUser/user.state';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function page() {
    useEffect(() => {
        redirect('/home');
    }, []);
    return <div>Hello world</div>;
}
