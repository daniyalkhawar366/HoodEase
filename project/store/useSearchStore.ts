'use client';

import { create } from 'zustand';

interface SearchState {
  isCategorySearchOpen: boolean;
  toggleCategorySearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isCategorySearchOpen: false,
  toggleCategorySearch: () =>
    set((state) => ({
      isCategorySearchOpen: !state.isCategorySearchOpen,
    })),
})); 