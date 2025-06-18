import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import Navbar from '@/components/Navbar';
// import CartDrawer from '@/components/CartDrawer';
// import { Toaster } from '@/components/ui/sonner';
// import Sidebar from '@/components/Sidebar';
// import { useState } from 'react';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HoodEase',
  description: 'HoodEase - Your premium destination for streetwear hoodies, t-shirts, and accessories. Wrapped in Comfort. Defined by Style.',
  icons: {
    icon: '/hood_ease_logo.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}