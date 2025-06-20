'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FullSection from '@/components/FullSection';
import HorizontalScroll from '@/components/HorizontalScroll';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react';
import { useStackScroll } from '@/hooks/useStackScroll';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';

export default function Home() {
  useStackScroll(); // Initialize stack scroll effect

  const heroImages = [
    'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg',
    'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
    'https://images.pexels.com/photos/8532615/pexels-photo-8532615.jpeg',
  ];

  const menImages = [
    'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
    'https://images.pexels.com/photos/159844/pexels-photo-159844.jpeg',
    'https://images.pexels.com/photos/167664/pexels-photo-167664.jpeg',
  ];

  const womenImages = [
    'https://images.pexels.com/photos/7679722/pexels-photo-7679722.jpeg',
    'https://images.pexels.com/photos/8532614/pexels-photo-8532614.jpeg',
    'https://images.pexels.com/photos/7679723/pexels-photo-7679723.jpeg',
  ];

  const kidsImages = [
    'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg',
    'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg',
  ];

  return (
    <div className="">
      {/* Hero Section */}
      <FullSection id="hero">
        <HorizontalScroll 
          images={heroImages}
          title=""
          description="WRAPPED IN COMFORT. DEFINED BY STYLE."
        />
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
          <Link href="/shop/men">
            <Button 
              variant="outline" 
              className="bg-transparent text-white border-white/50 hover:bg-white hover:text-text transition-all duration-300 minimal-text px-6 py-2"
            >
              MEN
            </Button>
          </Link>
          <Link href="/shop/women">
            <Button 
              variant="outline" 
              className="bg-transparent text-white border-white/50 hover:bg-white hover:text-text transition-all duration-300 minimal-text px-6 py-2"
            >
              WOMEN
            </Button>
          </Link>
          <Link href="/shop/kids">
            <Button 
              variant="outline" 
              className="bg-transparent text-white border-white/50 hover:bg-white hover:text-text transition-all duration-300 minimal-text px-6 py-2"
            >
              KIDS
            </Button>
          </Link>
        </div>
      </FullSection>

      {/* Men Section */}
      <FullSection id="men">
        <HorizontalScroll 
          images={menImages}
          title="MEN'S"
          description="BOLD DESIGNS FOR THE MODERN MAN"
        />
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
          <Link href="/shop/men">
            <Button 
              size="lg" 
              className="bg-white text-text hover:bg-warm-light hover:text-text minimal-text px-8 py-3 transition-all duration-300"
            >
              EXPLORE MEN'S COLLECTION
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </FullSection>

      {/* Women Section */}
      <FullSection id="women">
        <HorizontalScroll 
          images={womenImages}
          title="WOMEN'S"
          description="ELEGANT COMFORT MEETS STREET STYLE"
        />
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
          <Link href="/shop/women">
            <Button 
              size="lg" 
              className="bg-white text-text hover:bg-warm-light hover:text-text minimal-text px-8 py-3 transition-all duration-300"
            >
              EXPLORE WOMEN'S COLLECTION
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </FullSection>

      {/* Kids Section */}
      <FullSection id="kids">
        <HorizontalScroll 
          images={kidsImages}
          title="KIDS"
          description="STYLE STARTS YOUNG"
        />
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
          <Link href="/shop/kids">
            <Button 
              size="lg" 
              className="bg-white text-text hover:bg-warm-light hover:text-text minimal-text px-8 py-3 transition-all duration-300"
            >
              EXPLORE KIDS' COLLECTION
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </FullSection>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}