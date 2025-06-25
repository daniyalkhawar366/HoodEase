"use client";

import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { useAuthStore } from '@/store/useAuthStore';
import ImageCarousel from '@/components/ImageCarousel';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { toast } from 'sonner';

interface ProductDetailsClientProps {
  product: any;
  relatedProducts: any[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
  const { addToCart } = useStore();
  const { isAuthenticated, openAuthModal, user } = useAuthStore();
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    
    if (!selectedColor || !selectedSize) {
      toast.error('Please select both color and size');
      return;
    }
    
    // Debug log for cart item
    console.log('Adding to cart:', {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedColor,
      selectedSize,
    });
    
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedColor: selectedColor,
      selectedSize: selectedSize,
      stock: variantStock,
    }, quantity);

    toast.success('Added to cart!');
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }
    if (!selectedColor || !selectedSize) {
      toast.error('Please select both color and size');
      return;
    }
    setWishlistLoading(true);
    try {
      if (!user || !user._id) {
        toast.error('User not found. Please login again.');
        setWishlistLoading(false);
        return;
      }
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          productId: product._id,
          selectedColor,
          selectedSize,
        })
      });
      if (res.ok) {
        toast.success('Added to wishlist!');
      } else {
        const data = await res.json();
        if (data.error === 'Item already in wishlist') {
          toast.info('This item is already in your wishlist.');
        } else {
          toast.error(data.error || 'Failed to add to wishlist');
        }
      }
    } catch (e) {
      toast.error('Failed to add to wishlist');
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/product/${product.slug}`;
    await navigator.clipboard.writeText(url);
    toast.success('Product URL copied to clipboard!');
  };

  // Helper to get stock for selected color+size
  const getVariantStock = () => {
    if (!product.stockByVariant) return 0;
    const variant = product.stockByVariant.find(
      (v: any) => v.color === selectedColor && v.size === selectedSize
    );
    return variant ? variant.quantity : 0;
  };
  const variantStock = getVariantStock();

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full aspect-square relative rounded-lg overflow-hidden border bg-white flex items-center justify-center">
              <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <Badge variant="outline" className="mb-2 capitalize">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(24 reviews)</span>
              </div>
              <p className="text-3xl font-bold text-brand-600">PKR {product.price.toLocaleString('en-PK')}</p>
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Color Selection */}
            <div>
              <Label className="text-base font-medium mb-3 block">
                Color: {selectedColor && <span className="text-brand-600">{selectedColor}</span>}
              </Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                <div className="flex gap-3">
                  {product.colors.map((color: string) => (
                    <div key={color} className="flex items-center space-x-2">
                      <RadioGroupItem value={color} id={color} className="sr-only" />
                      <Label
                        htmlFor={color}
                        className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all ${
                          selectedColor === color ? 'border-brand-500 ring-2 ring-brand-200' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Size Selection */}
            <div>
              <Label className="text-base font-medium mb-3 block">
                Size: {selectedSize && <span className="text-brand-600">{selectedSize}</span>}
              </Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                <div className="flex gap-2">
                  {product.sizes.map((size: string) => (
                    <div key={size} className="flex items-center space-x-2">
                      <RadioGroupItem value={size} id={size} className="sr-only" />
                      <Label
                        htmlFor={size}
                        className={`px-4 py-2 border rounded-md cursor-pointer transition-all ${
                          selectedSize === size
                            ? 'border-brand-500 bg-brand-50 text-brand-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Quantity */}
            <div>
              <Label className="text-base font-medium mb-3 block">Quantity</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="bg-white"
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(variantStock, quantity + 1))}
                  disabled={quantity >= variantStock}
                  className="bg-white"
                >
                  +
                </Button>
                {variantStock === 0 && (
                  <span className="text-red-500 ml-4">Out of stock</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                variant="default"
                size="lg"
                className="w-full bg-black hover:bg-gray-800 text-white"
                onClick={handleAddToCart}
                disabled={variantStock === 0 || quantity > variantStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full flex items-center justify-center"
                onClick={handleAddToWishlist}
                disabled={wishlistLoading}
              >
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="flex-1 bg-brand-600 text-black hover:bg-brand-700" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Premium cotton blend fabric</li>
                <li>• Machine washable</li>
                <li>• Comfortable regular fit</li>
                <li>• Kangaroo pocket</li>
                <li>• Adjustable drawstring hood</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-8">Similar Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 