'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/store/useStore';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const router = useRouter();

  const handleShare = async () => {
    const url = `${window.location.origin}/shop/${product.category}/${product.slug}`;
    await navigator.clipboard.writeText(url);
    alert('Product URL copied to clipboard!'); // Replace with toast if you have one
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden border border-warm-light shadow-sm hover:shadow-lg transition-all duration-300 bg-white w-full">
        <div className="relative aspect-square overflow-hidden w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <Button
            size="icon"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white text-text border-0"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-4 md:p-6">
          <h3 className="font-semibold text-base md:text-lg mb-2 group-hover:text-text/70 transition-colors text-text minimal-text" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-lg md:text-2xl font-bold text-text" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
              PKR {product.price.toLocaleString('en-PK')}
            </span>
          </div>
          <Link href={`/product/${product.slug}`}>
            <Button className="w-full mt-4 bg-text hover:bg-text/90 text-warm-cream transition-colors minimal-text">
              View Details
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}