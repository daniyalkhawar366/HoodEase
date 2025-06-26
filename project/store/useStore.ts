'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './useAuthStore';
import { api } from '@/lib/api';

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
  stock?: number;
}

export interface CartItem {
  _id: string; // MongoDB ObjectId
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  stock?: number;
  variantId?: string;
}

interface StoreState {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalPrice: () => number;
  hydrateCartFromServer: (userId: string) => Promise<void>;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,

      addToCart: (item, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (cartItem) =>
              cartItem._id === item._id &&
              cartItem.selectedColor === item.selectedColor &&
              cartItem.selectedSize === item.selectedSize
          );

          let updatedCart;
          const maxAddable = item.stock || 1;
          if (existingItemIndex > -1) {
            updatedCart = [...state.cart];
            const currentQty = updatedCart[existingItemIndex].quantity;
            updatedCart[existingItemIndex].quantity = Math.min(currentQty + quantity, maxAddable);
          } else {
            updatedCart = [...state.cart, { ...item, quantity: Math.min(quantity, maxAddable), stock: item.stock }];
          }
          // Sync to server if logged in
          const { user, isAuthenticated } = useAuthStore.getState();
          if (isAuthenticated && user?._id) {
            console.log('[Cart Sync] Saving cart to server (addToCart)', user._id, updatedCart);
            api.users.setCart(user._id, updatedCart).catch((err) => {
              console.error('[Cart Sync] Error saving cart (addToCart):', err);
            });
          }
          return { cart: updatedCart };
        });
      },

      removeFromCart: (item) =>
        set((state) => {
          const updatedCart = state.cart.filter(
            (cartItem) =>
              !(cartItem._id === item._id &&
              cartItem.selectedColor === item.selectedColor &&
              cartItem.selectedSize === item.selectedSize)
          );
          // Sync to server if logged in
          const { user, isAuthenticated } = useAuthStore.getState();
          if (isAuthenticated && user?._id) {
            console.log('[Cart Sync] Saving cart to server (removeFromCart)', user._id, updatedCart);
            api.users.setCart(user._id, updatedCart).catch((err) => {
              console.error('[Cart Sync] Error saving cart (removeFromCart):', err);
            });
          }
          return { cart: updatedCart };
        }),

      clearCart: () => {
        // Sync to server if logged in
        const { user, isAuthenticated } = useAuthStore.getState();
        if (isAuthenticated && user?._id) {
          console.log('[Cart Sync] Clearing cart on server (clearCart)', user._id);
          api.users.setCart(user._id, []).catch((err) => {
            console.error('[Cart Sync] Error clearing cart (clearCart):', err);
          });
        }
        set({ cart: [] });
      },

      updateQuantity: (item, quantity) =>
        set((state) => {
          let updatedCart;
          if (quantity <= 0) {
            updatedCart = state.cart.filter(
              (cartItem) =>
                !(cartItem._id === item._id &&
                cartItem.selectedColor === item.selectedColor &&
                cartItem.selectedSize === item.selectedSize)
            );
          } else {
            updatedCart = state.cart.map((cartItem) =>
              cartItem._id === item._id &&
              cartItem.selectedColor === item.selectedColor &&
              cartItem.selectedSize === item.selectedSize
                ? { ...cartItem, quantity }
                : cartItem
            );
          }
          // Sync to server if logged in
          const { user, isAuthenticated } = useAuthStore.getState();
          if (isAuthenticated && user?._id) {
            console.log('[Cart Sync] Saving cart to server (updateQuantity)', user._id, updatedCart);
            api.users.setCart(user._id, updatedCart).catch((err) => {
              console.error('[Cart Sync] Error saving cart (updateQuantity):', err);
            });
          }
          return { cart: updatedCart };
        }),

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      // Hydrate cart from server for logged-in user
      hydrateCartFromServer: async (userId: string) => {
        try {
          console.log('[Cart Sync] Loading cart from server (hydrateCartFromServer)', userId);
          const data = await api.users.getCart(userId);
          // Fetch latest stock for each item
          const itemsWithStock = await Promise.all(
            (data.items || []).map(async (item: any) => {
              try {
                const res = await fetch(`/api/products/${item._id}`);
                if (res.ok) {
                  const prod = await res.json();
                  let stock = 1;
                  if (prod.stockByVariant) {
                    const variant = prod.stockByVariant.find(
                      (v: any) => v.color === item.selectedColor && v.size === item.selectedSize
                    );
                    stock = variant ? variant.quantity : 0;
                  } else if (typeof prod.stock === 'number') {
                    stock = prod.stock;
                  }
                  return { ...item, stock };
                }
              } catch {}
              return { ...item, stock: 1 };
            })
          );
          set({ cart: itemsWithStock });
        } catch (err) {
          console.error('[Cart Sync] Error loading cart from server:', err);
        }
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