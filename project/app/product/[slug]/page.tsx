'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProductDetailsClient from '@/components/ProductDetailsClient';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export default function ProductPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  // Debug: Log loaded product
  console.log('Loaded product:', product._id, product.name);

  // Render product details using the fetched product
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="w-full lg:w-1/2">
            {/* ...image carousel or image... */}
          </div>
          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {/* ...product info, buttons, etc... */}
          </div>
        </div>
      </div>
    </div>
  );
}

