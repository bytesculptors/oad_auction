import { Footer, Navbar } from '@/components';
import './globals.css';

export const metadata = {
    title: 'Antique Auction',
    description: 'A website which will take you back to the 16th century',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="relative">
                {/* <Navbar /> */}
                {children}
                {/* <Footer /> */}
            </body>
        </html>
    );
}
