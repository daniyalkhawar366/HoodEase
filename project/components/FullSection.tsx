'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FullSectionProps {
  children: ReactNode;
  backgroundImage?: string;
  className?: string;
  id?: string;
}

export default function FullSection({ children, backgroundImage, className, id }: FullSectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        "immersive-section snap-section",
        className
      )}
    >
      {backgroundImage && (
        <div 
          className="full-bg-image"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}
      <div className="section-gradient absolute inset-0 z-5" />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="content-overlay"
      >
        {children}
      </motion.div>
    </section>
  );
}