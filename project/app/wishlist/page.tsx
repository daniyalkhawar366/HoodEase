'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WishlistPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { addToCart } = useStore();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?._id) {
      setLoading(true);
      fetch(`/api/wishlist?userId=${user._id}`)
        .then(res => res.json())
        .then(data => setWishlist(data.items || []))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleRemove = async (item: any) => {
    if (!user?._id) return;
    await fetch('/api/wishlist', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user._id,
        productId: item.productId,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })
    });
    setWishlist(wishlist.filter(w =>
      !(w.productId === item.productId && w.selectedColor === item.selectedColor && w.selectedSize === item.selectedSize)
    ));
  };

  const handleAddToCart = async (item: any) => {
    // Add to cart using your store logic
    addToCart({
      _id: item.productId,
      name: item.product.name,
      price: item.product.price,
      image: item.product.image,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
      stock: item.product.stock,
    }, 1);
    // Remove from wishlist
    await handleRemove(item);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
        <p>Please <Link href="/" className="text-blue-600 underline">login</Link> to view your wishlist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-bold mb-8">Your Wishlist</h2>
      {loading ? (
        <div>Loading...</div>
      ) : wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <span className="text-3xl font-bold text-gray-400">Your wishlist is empty.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item, idx) => (
            <div key={idx} className="border rounded-lg p-4 flex flex-col items-center">
              <img src={item.product?.image || item.product?.images?.[0]} alt={item.product?.name} className="w-40 h-40 object-cover mb-4 rounded" />
              <h3 className="text-lg font-semibold mb-2">{item.product?.name}</h3>
              <p className="mb-1">Price: ${item.product?.price}</p>
              <p className="mb-1">Color: {item.selectedColor}</p>
              <p className="mb-1">Size: {item.selectedSize}</p>
              <p className="mb-2 text-sm text-gray-500">{item.product?.description}</p>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" onClick={() => handleRemove(item)}>Remove</Button>
                <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 