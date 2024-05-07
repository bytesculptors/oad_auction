import { Footer, Navbar } from '@/components';
import './globals.css';
import Providers from '@/redux/provider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Antique Auction',
    description: 'A website which will take you back to the 16th century',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="relative overflow-x-hidden">
                <Providers>
                    {/* <Navbar /> */}
                    {children}
                    {/* <Footer /> */}
                </Providers>
            </body>
        </html>
    );
}
