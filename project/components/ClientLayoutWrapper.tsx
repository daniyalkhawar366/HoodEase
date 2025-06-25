'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import { Toaster } from '@/components/ui/sonner';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSearchStore } from '@/store/useSearchStore';
import { AnimatePresence, motion } from 'framer-motion';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isCategorySearchOpen, toggleCategorySearch } = useSearchStore();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const searchFormRef = useRef<HTMLFormElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Keep local input in sync with URL param
    setSearchInput(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearchSubmit = () => {
    if (!searchInput.trim()) return;

    const isShopPage = pathname.startsWith('/shop/');
    const category = isShopPage ? pathname.split('/')[2] : '';

    if (category) {
      router.push(`/shop/${category}?q=${encodeURIComponent(searchInput)}`);
      toggleCategorySearch(); // Close search bar after submit
    }
  };

  const handleSearchClick = () => {
    toggleCategorySearch();
  };

  const isStaticNavbar = pathname === '/cart' ||
                        pathname.startsWith('/product/');
  const isAdminRoute = pathname.startsWith('/admin');
  const isShopPage = pathname.startsWith('/shop/');
  const category = isShopPage ? pathname.split('/')[2] : '';

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

  // Close on click outside
  useEffect(() => {
    if (!isCategorySearchOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (searchFormRef.current && !searchFormRef.current.contains(event.target as Node)) {
        toggleCategorySearch();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCategorySearchOpen, toggleCategorySearch]);

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
      <AnimatePresence>
        {isCategorySearchOpen && (
          <motion.form
            ref={searchFormRef}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.25 }}
            onSubmit={e => {
              e.preventDefault();
              if (!searchInput.trim()) return;
              const isShopPage = pathname.startsWith('/shop/');
              const category = isShopPage ? pathname.split('/')[2] : '';
              if (category) {
                router.push(`/shop/${category}?q=${encodeURIComponent(searchInput)}`);
                toggleCategorySearch();
              }
            }}
            className="fixed left-1/2 top-24 z-[9999] w-full max-w-md -translate-x-1/2 px-2"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div className="flex w-full items-center rounded-full bg-white border border-gray-200 px-2 py-1 shadow-xl gap-1">
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search for products..."
                className="flex-1 border-0 focus:ring-0 focus:outline-none bg-transparent text-base px-2 py-1 rounded-full placeholder-gray-400"
              />
              <button
                type="submit"
                className="rounded-full bg-black text-white hover:bg-gray-900 px-4 py-1 text-sm font-semibold transition-colors duration-200 shadow-md"
              >
                Search
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}