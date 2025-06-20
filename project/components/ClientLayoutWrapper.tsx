'use client';

import { useState, useEffect } from 'react';
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

  const isStaticNavbar = pathname === '/shop/men' || 
                        pathname === '/shop/women' || 
                        pathname === '/shop/kids' || 
                        pathname === '/contact' || 
                        pathname === '/cart' ||
                        pathname.startsWith('/product/');
  const isAdminRoute = pathname.startsWith('/admin');

  // Sidebar auto-open for user pages
  useEffect(() => {
    if (isAdminRoute) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX <= 2) {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isAdminRoute]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar toggleSidebar={toggleSidebar} isStatic={isStaticNavbar} />}
      <main className={`flex-grow ${isSidebarOpen ? 'overflow-hidden' : ''}`}>
        {children}
      </main>
      <CartDrawer />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <Toaster />
      {!isAdminRoute && <Footer />}
    </div>
  );
} 