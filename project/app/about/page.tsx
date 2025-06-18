'use client';

import { motion } from 'framer-motion';
// import Image from 'next/image';
import Timeline from '@/components/Timeline';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Heart, Globe, Users, Award } from 'lucide-react';
import './about.css';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-text about-page">
      <Timeline />
    </div>
  );
}