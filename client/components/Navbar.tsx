'use client';
import Link from 'next/link';
import Image from 'next/image';
import CustomButton from './CustomButton';
import { store } from '@/redux/Store';
import { setStateUser } from '@/redux/stateUser/user.state';
import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';

interface NavbarProps {
    isLoggin?: boolean;
    name?: string;
    role?: string;
}

const Navbar = ({ isLoggin = false, name, role = '' }: NavbarProps) => {
    const [addressBaseRole, setAddressBaseRole] = useState('/home');
    const router = useRouter();
    useEffect(() => {
        if (role === 'admin') {
            setAddressBaseRole('/home/admin');
        } else if (role === 'seller') {
            setAddressBaseRole('/home/seller');
        } else if (role === 'user') {
            setAddressBaseRole('/home/user');
        }
    }, [role]);
    return (
        <header className="w-full bg-blue-700">
            <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
                <Link href="/home" className="flex justify-center items-center">
                    <Image src="/logo1.svg" alt="Antique Auction" width={148} height={48} className="object-contain" />
                </Link>

                {isLoggin ? (
                    <div className="flex flex-row gap-x-4">
                        <Link href={addressBaseRole}>
                            <CustomButton
                                title={'Hello ' + role + ' ' + name}
                                btnType="button"
                                containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
                            />
                        </Link>
                        <CustomButton
                            handleClick={(e) => {
                                store.dispatch(
                                    setStateUser({
                                        _id: '',
                                        balance: 0,
                                        email: '',
                                        name: '',
                                        role: '',
                                    }),
                                );
                                localStorage.removeItem('user');
                                router.push('/home');
                            }}
                            title="Log out"
                            btnType="button"
                            containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
                        />
                    </div>
                ) : (
                    <Link href="/login">
                        <CustomButton
                            title="Sign In"
                            btnType="button"
                            containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
                        />
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
