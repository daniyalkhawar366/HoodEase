'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  dateOfBirth: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  signup: (userData: StoredUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,

      login: (email: string, password: string) => {
        // Check for admin credentials
        if (email === 'Admin@Hoodease.com' && password === 'rootpass1') {
          set({
            user: {
              firstName: 'Admin',
              lastName: 'User',
              email: 'Admin@Hoodease.com',
              address: 'Admin Address',
              dateOfBirth: '1990-01-01'
            },
            isAuthenticated: true,
            isAdmin: true
          });
          return true;
        }

        // For regular users, check if they exist in localStorage
        const users: StoredUser[] = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: StoredUser) => u.email === email && u.password === password);
        
        if (user) {
          const { password, ...userWithoutPassword } = user;
          set({
            user: userWithoutPassword,
            isAuthenticated: true,
            isAdmin: false
          });
          return true;
        }

        return false;
      },

      signup: (userData: StoredUser) => {
        // Get existing users
        const users: StoredUser[] = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if email already exists
        const existingUser = users.find((u: StoredUser) => u.email === userData.email);
        if (existingUser) {
          throw new Error('Email already exists');
        }

        // Add new user
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));

        // Set current user (without password)
        const { password, ...userWithoutPassword } = userData;
        set({
          user: userWithoutPassword,
          isAuthenticated: true,
          isAdmin: false
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false
        });
      }
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