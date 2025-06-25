'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeColumn, setActiveColumn] = useState('MEN');
  const router = useRouter();

  // Helper to handle category click for MEN, WOMEN, KIDS
  const handleCategoryClick = (section: string, category: string) => {
    let path = '';
    let eventName = '';
    let subcategory = '';
    if (section === 'MEN') {
      path = '/shop/men';
      eventName = 'setMenFilter';
    } else if (section === 'WOMEN') {
      path = '/shop/women';
      eventName = 'setWomenFilter';
    } else if (section === 'KIDS') {
      path = '/shop/kids';
      eventName = 'setKidsFilter';
    }
    // Map sidebar label to subcategory name used in product data
    const map = {
      MEN: {
        Casual: 'Casual Shirts',
        Dress: 'Dress Shirts',
        Polo: 'Polo Shirts',
        Printed: 'Printed Shirts',
        Denim: 'Denim Shirts',
        Linen: 'Linen Shirts',
        Oversized: 'Oversized Shirts',
        Flannel: 'Flannel Shirts',
        Striped: 'Striped Shirts',
        'T-Shirts': 'T-Shirts',
      },
      WOMEN: {
        Casual: 'Casual Shirts',
        Dress: 'Dress Shirts',
        Printed: 'Printed Shirts',
        Linen: 'Linen Shirts',
        Oversized: 'Oversized Shirts',
        Flannel: 'Flannel Shirts',
      },
      KIDS: {
        Graphic: 'Graphic Shirts',
        Casual: 'Casual Shirts',
        Cartoon: 'Cartoon Shirts',
        Party: 'Party Shirts',
        Flannel: 'Flannel Shirts',
      },
    };
    const sectionMap = map[section as keyof typeof map];
    subcategory = sectionMap[category as keyof typeof sectionMap] || category;
    // Merge with current search params
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('subcategory', subcategory);
    const newUrl = `${path}?${currentParams.toString()}`;
    console.log('[Sidebar] handleCategoryClick:', { section, category, subcategory, newUrl });
    try {
      router.push(newUrl);
    } catch (err) {
      console.error('[Sidebar] router.push failed, falling back to window.location.href', err);
      window.location.href = newUrl;
    }
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(eventName, { detail: { subcategory } }));
      }
      onClose();
    }, 100);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? '0%' : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 h-full w-96 bg-white shadow-lg z-50 p-6"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold minimal-text">HOODEASE</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-4">
          {/* MEN Section */}
          <div className="relative">
            <h3 
              className={`text-xl font-bold mb-4 minimal-text cursor-pointer pb-2 ${activeColumn === 'MEN' ? 'border-b-2 border-black' : ''}`}
              onClick={() => setActiveColumn('MEN')}
            >
              MEN
            </h3>
            <motion.div
              initial={{ height: 'auto', opacity: 1 }}
              animate={{ height: activeColumn === 'MEN' ? 'auto' : 0, opacity: activeColumn === 'MEN' ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-3">
                <button onClick={() => handleCategoryClick('MEN', 'Casual')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Casual
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('MEN', 'Dress')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Dress
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('MEN', 'Polo')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Polo
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('MEN', 'Printed')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Printed
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('MEN', 'Denim')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Denim
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('MEN', 'Linen')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Linen
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('MEN', 'Oversized')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Oversized
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('MEN', 'Flannel')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Flannel
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('MEN', 'Striped')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Striped
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('MEN', 'T-Shirts')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  T-Shirts
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* WOMEN Section */}
          <div className="relative">
            <h3 
              className={`text-xl font-bold mb-4 minimal-text cursor-pointer pb-2 ${activeColumn === 'WOMEN' ? 'border-b-2 border-black' : ''}`}
              onClick={() => setActiveColumn('WOMEN')}
            >
              WOMEN
            </h3>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: activeColumn === 'WOMEN' ? 'auto' : 0, opacity: activeColumn === 'WOMEN' ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-3">
                <button onClick={() => handleCategoryClick('WOMEN', 'Casual')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Casual
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('WOMEN', 'Dress')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Dress
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('WOMEN', 'Printed')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Printed
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('WOMEN', 'Linen')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Linen
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('WOMEN', 'Oversized')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Oversized
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('WOMEN', 'Flannel')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Flannel
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* KIDS Section */}
          <div className="relative">
            <h3 
              className={`text-xl font-bold mb-4 minimal-text cursor-pointer pb-2 ${activeColumn === 'KIDS' ? 'border-b-2 border-black' : ''}`}
              onClick={() => setActiveColumn('KIDS')}
            >
              KIDS
            </h3>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: activeColumn === 'KIDS' ? 'auto' : 0, opacity: activeColumn === 'KIDS' ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-3">
                <button onClick={() => handleCategoryClick('KIDS', 'Graphic')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Graphic
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('KIDS', 'Casual')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Casual
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('KIDS', 'Cartoon')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Cartoon
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('KIDS', 'Party')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Party
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button onClick={() => handleCategoryClick('KIDS', 'Flannel')} className="block text-left w-full text-text hover:text-gray-600 transition-colors text-sm relative group bg-transparent border-0 p-0">
                  Flannel
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
            </motion.div>
          </div>
        </nav>
      </motion.div>
    </>
  );
} 