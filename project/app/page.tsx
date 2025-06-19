'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FullSection from '@/components/FullSection';
import HorizontalScroll from '@/components/HorizontalScroll';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react';
import { useStackScroll } from '@/hooks/useStackScroll';

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
      <FullSection className="bg-text" id="footer">
        <div className="container mx-auto px-6 py-20 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-warm-cream"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8 minimal-text">
                STAY CONNECTED
              </h2>
              <p className="text-lg mb-12 text-warm-cream/80 font-light">
                Be the first to know about new drops, exclusive offers, and style inspiration.
              </p>
              
              <div className="flex space-x-4 mb-12">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-warm-cream hover:text-warm-light h-12 w-12 hover:bg-transparent transition-colors duration-300"
                >
                  <Instagram className="h-6 w-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-warm-cream hover:text-warm-light h-12 w-12 hover:bg-transparent transition-colors duration-300"
                >
                  <Twitter className="h-6 w-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-warm-cream hover:text-warm-light h-12 w-12 hover:bg-transparent transition-colors duration-300"
                >
                  <Facebook className="h-6 w-6" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-12 text-sm">
                <div>
                  <h3 className="font-bold mb-6 minimal-text text-warm-light">SHOP</h3>
                  <div className="space-y-3 text-warm-cream/60">
                    <Link href="/shop/men" className="block hover:text-warm-light transition-colors minimal-text">MEN'S</Link>
                    <Link href="/shop/women" className="block hover:text-warm-light transition-colors minimal-text">WOMEN'S</Link>
                    <Link href="/shop/kids" className="block hover:text-warm-light transition-colors minimal-text">KIDS'</Link>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-6 minimal-text text-warm-light">SUPPORT</h3>
                  <div className="space-y-3 text-warm-cream/60">
                    <Link href="/about" className="block hover:text-warm-light transition-colors minimal-text">ABOUT</Link>
                    <Link href="/contact" className="block hover:text-warm-light transition-colors minimal-text">CONTACT</Link>
                    <Link href="#" className="block hover:text-warm-light transition-colors minimal-text">RETURNS</Link>
                    <Link href="#" className="block hover:text-warm-light transition-colors minimal-text">SIZE GUIDE</Link>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-lg p-8 border border-black/20"
            >
              <h3 className="text-2xl font-bold text-black mb-6 minimal-text">NEWSLETTER</h3>
              <p className="text-black/80 mb-6 font-light">
                Get 10% off your first order when you sign up for our newsletter.
              </p>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  className="bg-gray-100 border-gray-300 text-black placeholder:text-gray-500 h-12 minimal-text focus:border-black focus:ring-black"
                />
                <Button className="w-full bg-black text-white hover:bg-gray-800 hover:text-white h-12 font-bold minimal-text transition-all duration-300">
                  SUBSCRIBE
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="border-t border-black/20 mt-20 pt-8 text-center text-black/60">
            <p className="minimal-text text-sm">&copy; 2024 HOODEASE. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </FullSection>
    </div>
  );
}