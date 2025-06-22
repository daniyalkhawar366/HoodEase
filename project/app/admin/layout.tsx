'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import { Toaster } from '@/components/ui/sonner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const openSidebar = () => setSidebarOpen(true);
    window.addEventListener('open-admin-sidebar', openSidebar);
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX <= 2) {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('open-admin-sidebar', openSidebar);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Toaster />

      <AnimatePresence>
        {!sidebarOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.2 } }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
            className="absolute top-4 left-6 md:left-12 z-50 p-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      <main className="isolate">
        <div className={`p-6 pt-12 md:p-12 md:pt-16 transition-all duration-300 ${sidebarOpen ? 'blur-sm' : ''}`}>
          {children}
        </div>
      </main>
    </div>
  );
} 