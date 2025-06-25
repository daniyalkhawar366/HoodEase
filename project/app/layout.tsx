import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppClientWrapper from '@/components/AppClientWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HoodEase',
  description: 'HoodEase - Your premium destination for streetwear hoodies, t-shirts, and accessories. Wrapped in Comfort. Defined by Style.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <AppClientWrapper>{children}</AppClientWrapper>
      </body>
    </html>
  );
}