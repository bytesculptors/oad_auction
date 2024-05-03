'use client';
import Link from 'next/link';
import Image from 'next/image';
import CustomButton from './CustomButton';

const Navbar = () => {
    return (
        <header className="w-full bg-blue-500">
            <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
                <Link href="/" className="flex justify-center items-center">
                    <Image src="/logo1.svg" alt="Antique Auction" width={148} height={48} className="object-contain" />
                </Link>
                <Link href="/login">
                    <CustomButton
                        title="Sign In"
                        btnType="button"
                        containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
                    />
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;
