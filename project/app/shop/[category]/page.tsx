'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';
import { useSearchStore } from '@/store/useSearchStore';

interface ShopPageProps {
  params: { category: string };
}

export default function ShopPage({ params }: ShopPageProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  // Always get category from pathname
  const pathParts = pathname.split('/');
  const category = pathParts[pathParts.indexOf('shop') + 1] || '';

  const [products, setProducts] = useState<any[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');

  // Extract relevant search params
  const searchQueryParam = searchParams.get('q') || '';
  console.log('[ShopPage] Rendered. searchQueryParam:', searchQueryParam);
  // You can extract more params if needed

  const [searchInput, setSearchInput] = useState(searchQueryParam);

  useEffect(() => {
    setSearchInput(searchQueryParam);
  }, [searchQueryParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update the URL with the new search query
    const params = new URLSearchParams(window.location.search);
    if (searchInput) {
      params.set('q', searchInput);
    } else {
      params.delete('q');
    }
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    console.log('[ShopPage] useEffect triggered. searchQueryParam:', searchQueryParam);
    const fetchProducts = async () => {
      let url = `/api/products?category=${category}`;
      if (selectedSubCategory) {
        url += `&subcategory=${selectedSubCategory}`;
      }
      // Add all search params from the URL
      searchParams.forEach((value, key) => {
        if (key !== 'category' && key !== 'subcategory') {
          url += `&${key}=${encodeURIComponent(value)}`;
        }
      });
      console.log('[ShopPage] Fetching products from:', url);
      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log('[ShopPage] Fetched data:', data);
        setProducts(data.products || []);
      } catch (error) {
        console.error('[ShopPage] Failed to fetch products:', error, url);
      }
    };
    fetchProducts();
  }, [category, selectedSubCategory, searchQueryParam]);

  // Get unique colors from products
  const availableColors = useMemo(() => {
    const colors = new Set<string>();
    products.forEach((product: any) => {
      if (product.colors) {
        product.colors.forEach((color: string) => colors.add(color));
      }
    });
    return Array.from(colors);
  }, [products]);

  // Helper for close match
  function closeMatch(a: string = '', b: string = '') {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return a.includes(b) || b.includes(a);
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Client-side search filter for q
    if (searchQueryParam) {
      const q = searchQueryParam.toLowerCase();
      filtered = filtered.filter(product =>
        closeMatch(product.name, q) ||
        closeMatch(product.category, q) ||
        closeMatch(product.subcategory, q) ||
        closeMatch(product.description, q)
      );
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) return product.price >= min && product.price <= max;
        return product.price >= min;
      });
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product: any) =>
        product.colors.some((color: string) => selectedColors.includes(color))
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order for featured
        break;
    }

    return filtered;
  }, [products, priceRange, selectedColors, sortBy, searchQueryParam]);

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const clearFilters = () => {
    setPriceRange('all');
    setSelectedColors([]);
    setSortBy('featured');
  };

  const hasFilters = priceRange !== 'all' || selectedColors.length > 0 || sortBy !== 'featured' || searchQueryParam !== '';

  const { isCategorySearchOpen, toggleCategorySearch } = useSearchStore();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when bar opens
  useEffect(() => {
    if (isCategorySearchOpen) {
      setSearchInput(searchQueryParam);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isCategorySearchOpen, searchQueryParam]);

  // Close on click outside
  useEffect(() => {
    if (!isCategorySearchOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        toggleCategorySearch();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCategorySearchOpen, toggleCategorySearch]);

  const handleFloatingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (searchInput) {
      params.set('q', searchInput);
    } else {
      params.delete('q');
    }
    router.push(`?${params.toString()}`);
    toggleCategorySearch();
  };

  return (
    <div key={searchQueryParam} className="min-h-screen pt-20 bg-gray-50 flex flex-col items-center">
      <div className="container mx-auto px-2 sm:px-6 md:px-8 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-4xl font-bold capitalize mb-4">
            {category}'s Collection
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Discover our premium {category}'s hoodies collection
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-64 w-full space-y-6 mb-6 lg:mb-0"
          >
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </h2>
                {hasFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-50">Under $50</SelectItem>
                    <SelectItem value="50-75">$50 - $75</SelectItem>
                    <SelectItem value="75-100">$75 - $100</SelectItem>
                    <SelectItem value="100">$100+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Colors */}
              <div>
                <label className="block text-sm font-medium mb-2">Colors</label>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color: string) => (
                    <Badge
                      key={color}
                      variant={selectedColors.includes(color) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-brand-100"
                      onClick={() => toggleColor(color)}
                    >
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid or Not Found */}
          <div className="flex-1 w-full">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[200px] py-8">
                <h2 className="text-xl md:text-3xl font-bold text-gray-700 mb-4">No items found</h2>
                <p className="text-gray-500 text-base md:text-lg">
                  We couldn't find any products matching <span className="font-semibold">"{searchQueryParam}"</span>.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product._id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}