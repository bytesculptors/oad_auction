'use client';
import { IUserInfor } from '@/interfaces/user.interface';
import { RootState } from '@/redux/store';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
    const user: IUserInfor = useSelector((state: RootState) => state.user);
    useEffect(() => {
        console.log(user);
    }, [user]);
    return (
        <main>
            <Link href={{ pathname: '/login' }} scroll={false}>
                <Button variant="contained" size="large" sx={{ margin: '16px 16px' }}>
                    Go to login
                </Button>
            </Link>
        </main>
    );
}
