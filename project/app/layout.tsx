import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import Navbar from '@/components/Navbar';
// import CartDrawer from '@/components/CartDrawer';
// import { Toaster } from '@/components/ui/sonner';
// import Sidebar from '@/components/Sidebar';
// import { useState } from 'react';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import { useSettingsStore } from '@/store/useStore';
import { useAuthStore } from '@/store/useAuthStore';

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
  const { maintenance } = typeof window !== 'undefined' ? useSettingsStore() : { maintenance: false };
  const { isAdmin } = typeof window !== 'undefined' ? useAuthStore() : { isAdmin: false };

  return (
    <html lang="en">
      <body className={inter.className}>
        {maintenance && !isAdmin ? (
          <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <div className="max-w-lg p-8 rounded-2xl shadow-2xl bg-gray-900 border border-gray-700 text-center">
              <h1 className="text-4xl font-bold mb-4">🚧 Maintenance Mode</h1>
              <p className="text-lg mb-6">Our site is currently undergoing scheduled maintenance.<br />We'll be back soon. Thank you for your patience!</p>
              <div className="animate-pulse text-6xl mb-2">🛠️</div>
              <p className="text-gray-400">If you need urgent help, please contact support@hoodease.com</p>
            </div>
          </div>
        ) : (
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        )}
      </body>
    </html>
  );
}