'use client';

import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useStore } from '@/store/useStore';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, getTotalPrice } = useStore();

  // Debug: Log cart contents
  console.log('Cart contents:', cart);

  const totalPrice = getTotalPrice();

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-lg bg-white">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({cart.length})
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item: any) => (
                  <div key={`${item._id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4 p-4 border rounded-lg">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        {item.selectedColor} • {item.selectedSize}
                      </p>
                      <p className="font-semibold">PKR {item.price.toLocaleString('en-PK')}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item)}
                        className="h-6 w-6"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item, item.quantity - 1)}
                          className="h-6 w-6 bg-black text-white border-black hover:bg-gray-800"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item, item.quantity + 1)}
                          className="h-6 w-6 bg-black text-white border-black hover:bg-gray-800"
                          disabled={item.quantity >= (item.stockByVariant || 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        {item.stockByVariant !== undefined && item.quantity >= item.stockByVariant && (
                          <span className="text-xs text-red-500 ml-2">Max stock</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="border-t pt-6 pb-6 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total: PKR {totalPrice.toLocaleString('en-PK')}</span>
              </div>
              <div>
                <Link href="/cart" onClick={toggleCart} className="block mb-6">
                  <Button variant="outline" className="w-full bg-white text-black border-gray-300 hover:bg-gray-50">
                    View Cart
                  </Button>
                </Link>
                <Link href="/checkout" onClick={toggleCart} className="block">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white">
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}