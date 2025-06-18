import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'men' | 'women' | 'kids';
  subcategory?: string;
  slug: string;
  colors: string[];
  sizes: string[];
  description: string;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface StoreState {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, color: string, size: string, quantity?: number) => void;
  removeFromCart: (id: string, color: string, size: string) => void;
  updateQuantity: (id: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      
      addToCart: (product, color, size, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.find(
          item => item.id === product.id && item.selectedColor === color && item.selectedSize === size
        );
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id && item.selectedColor === color && item.selectedSize === size
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            cart: [...cart, { ...product, quantity, selectedColor: color, selectedSize: size }]
          });
        }
      },
      
      removeFromCart: (id, color, size) => {
        set({
          cart: get().cart.filter(
            item => !(item.id === id && item.selectedColor === color && item.selectedSize === size)
          )
        });
      },
      
      updateQuantity: (id, color, size, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id, color, size);
          return;
        }
        
        set({
          cart: get().cart.map(item =>
            item.id === id && item.selectedColor === color && item.selectedSize === size
              ? { ...item, quantity }
              : item
          )
        });
      },
      
      clearCart: () => set({ cart: [] }),
      
      toggleCart: () => set({ isCartOpen: !get().isCartOpen }),
      
      getTotalItems: () => get().cart.reduce((total, item) => total + item.quantity, 0),
      
      getTotalPrice: () => get().cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    }),
    {
      name: 'hoodease-cart',
    }
  )
);