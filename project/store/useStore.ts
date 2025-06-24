'use client';

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

export interface CartItem {
  _id: string; // MongoDB ObjectId
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface StoreState {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalPrice: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,

      addToCart: (item) => {
        console.log("Adding to cart:", item); // DEBUG: Log item being added
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (cartItem) =>
              cartItem._id === item._id &&
              cartItem.selectedColor === item.selectedColor &&
              cartItem.selectedSize === item.selectedSize
          );

          if (existingItemIndex > -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingItemIndex].quantity += 1;
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        });
      },

      removeFromCart: (item) =>
        set((state) => ({
          cart: state.cart.filter(
            (cartItem) =>
              !(cartItem._id === item._id &&
              cartItem.selectedColor === item.selectedColor &&
              cartItem.selectedSize === item.selectedSize)
          ),
        })),

      clearCart: () => set({ cart: [] }),

      updateQuantity: (item, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            get().removeFromCart(item);
            return {};
          }
          return {
            cart: state.cart.map((cartItem) =>
              cartItem._id === item._id &&
              cartItem.selectedColor === item.selectedColor &&
              cartItem.selectedSize === item.selectedSize
                ? { ...cartItem, quantity }
                : cartItem
            ),
          };
        }),

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

// Global admin settings store
interface SettingsState {
  adminEmail: string;
  phone: string;
  supportEmail: string;
  showEmail: boolean;
  showPhone: boolean;
  showSupport: boolean;
  currency: string;
  language: string;
  timezone: string;
  maintenance: boolean;
  theme: 'dark' | 'light';
  setSettings: (settings: Partial<Omit<SettingsState, 'setSettings'>>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      adminEmail: 'admin@hoodease.com',
      phone: '+92 300 1234567',
      supportEmail: 'support@hoodease.com',
      showEmail: true,
      showPhone: false,
      showSupport: true,
      currency: 'PKR',
      language: 'English',
      timezone: 'Asia/Karachi',
      maintenance: false,
      theme: 'dark',
      setSettings: (settings) => set({ ...get(), ...settings }),
    }),
    { name: 'hoodease-admin-settings' }
  )
);