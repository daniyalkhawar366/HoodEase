'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import { Toaster } from '@/components/ui/sonner';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isStaticNavbar = pathname === '/shop/men' || pathname === '/shop/women' || pathname === '/shop/kids' || pathname === '/contact';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} isStatic={isStaticNavbar} />
      <main className={`flex-grow ${isSidebarOpen ? 'overflow-hidden' : ''}`}>
        {children}
      </main>
      <CartDrawer />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <Toaster />
      <Footer />
    </div>
  );
} 