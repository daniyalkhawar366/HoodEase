'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HorizontalScrollProps {
  images: string[];
  title: string;
  description?: string;
}

export default function HorizontalScroll({ images, title, description }: HorizontalScrollProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0 for no movement, 1 for next, -1 for previous

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: direction * 300 }} // Animate based on direction
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 300 }} // Animate based on direction
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 full-bg-image"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </AnimatePresence>
      
      <div className="section-gradient absolute inset-0 z-5" />
      
      <div className="content-overlay">
        <div className="text-center text-white max-w-4xl mx-auto px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-shadow minimal-text"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl mb-8 text-shadow font-light"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-8 top-1/2 -translate-y-1/2 text-white hover:text-warm-light h-12 w-12 z-20 transition-colors duration-300 flex items-center justify-center"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-white hover:text-warm-light h-12 w-12 z-20 transition-colors duration-300 flex items-center justify-center"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}