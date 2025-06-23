'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/lib/api';
import { useStore } from './useStore';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  dateOfBirth: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup' | 'forgot-password' | 'verification-sent';
  login: (email: string, password: string) => Promise<any>;
  signup: (userData: any) => Promise<any>;
  logout: () => void;
  openAuthModal: (mode: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  setAuthModalMode: (mode: 'login' | 'signup' | 'forgot-password' | 'verification-sent') => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      isAuthModalOpen: false,
      authModalMode: 'login',

      login: async (email: string, password: string) => {
        try {
          const res = await api.auth.login(email, password);
          if (res.error) {
            return { error: res.error, needsVerification: res.needsVerification };
          }
          set({
            user: res.user,
            isAuthenticated: true,
            isAdmin: res.isAdmin || false
          });
          return { user: res.user };
        } catch (e: any) {
          return { error: e.message || 'Login failed' };
        }
      },

      signup: async (userData: any) => {
        try {
          const res = await api.auth.signup(userData);
          if (res.error) {
            return { error: res.error };
          }
          // Don't log in user automatically on signup
          return { message: res.message };
        } catch (e: any) {
          return { error: e.message || 'Signup failed' };
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false
        });
        // Clear cart on logout
        const { clearCart } = useStore.getState();
        clearCart();
        // Redirect to landing page
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
      },

      openAuthModal: (mode) => set({ isAuthModalOpen: true, authModalMode: mode }),
      closeAuthModal: () => set({ isAuthModalOpen: false }),
      setAuthModalMode: (mode) => set({ authModalMode: mode }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin
      })
    }
  )
); 