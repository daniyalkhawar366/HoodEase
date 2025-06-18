'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-black text-white py-12 md:py-20"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 minimal-text">HOODEASE</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Wrapped in Comfort. Defined by Style. Your premium destination for streetwear hoodies, t-shirts, and accessories.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 minimal-text">SHOP</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/shop/men" className="hover:text-white transition-colors">MEN'S</Link></li>
              <li><Link href="/shop/women" className="hover:text-white transition-colors">WOMEN'S</Link></li>
              <li><Link href="/shop/kids" className="hover:text-white transition-colors">KIDS'</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 minimal-text">SUPPORT</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">ABOUT US</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">CONTACT US</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">RETURNS</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">SIZE GUIDE</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">&copy; {new Date().getFullYear()} HOODEASE. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
} 