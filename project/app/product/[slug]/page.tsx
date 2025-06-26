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
    <ProductDetailsClient product={product} relatedProducts={[]} />
  );
}

