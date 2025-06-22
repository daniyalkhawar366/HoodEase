import { Product } from '@/store/useStore';

const API_BASE = '/api';

export const api = {
  // Product APIs
  products: {
    getAll: async (params?: { category?: string; subcategory?: string; limit?: number; page?: number }) => {
      const searchParams = new URLSearchParams();
      if (params?.category) searchParams.append('category', params.category);
      if (params?.subcategory) searchParams.append('subcategory', params.subcategory);
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.page) searchParams.append('page', params.page.toString());

      const response = await fetch(`${API_BASE}/products?${searchParams}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },

    getBySlug: async (slug: string) => {
      const response = await fetch(`${API_BASE}/products/${slug}`);
      if (!response.ok) throw new Error('Product not found');
      return response.json();
    },

    create: async (product: Omit<Product, 'id'>) => {
      const response = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (!response.ok) throw new Error('Failed to create product');
      return response.json();
    },

    update: async (slug: string, product: Partial<Product>) => {
      const response = await fetch(`${API_BASE}/products/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (!response.ok) throw new Error('Failed to update product');
      return response.json();
    },

    delete: async (slug: string) => {
      const response = await fetch(`${API_BASE}/products/${slug}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete product');
      return response.json();
    }
  },

  // Auth APIs
  auth: {
    login: async (email: string, password: string) => {
      const response = await fetch(`${API_BASE}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) throw new Error('Login failed');
      return response.json();
    },

    signup: async (userData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      address: string;
      dateOfBirth: string;
    }) => {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Signup failed');
      return response.json();
    }
  }
}; 