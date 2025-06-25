'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const menCategories = [
  {
    name: 'Casual Shirts',
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750225434/Casual_e4ihqk.webp'
  },
  {
    name: 'Dress Shirts',
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750225433/dress_vq583t.avif',
  },
  {
    name: 'Polo Shirts',
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750225433/polo_nnkdgc.webp',
  },
  {
    name: 'Printed Shirts',
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750225433/printed_vzop9q.avif',
  },
  {
    name: 'Denim Shirts',
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750225434/denim_uulzl7.avif',
  },
  {
    name: 'Linen Shirts',
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750225434/linen_uwoajf.avif',
  },
  {
    name: 'Oversized Shirts',
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750225432/oversized_duofgd.webp',
  },
  {
    name: 'Flannel Shirts',
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750225432/flannel_zu2rz8.jpg',
  },
  {
    name: 'Striped Shirts',
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750225433/striped_lybdte.jpg',
  },
  {
    name: 'T-Shirts',
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750225432/T_mjssda.webp',
  },
];

export default function MenShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('alphabetical');
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQueryParam = searchParams.get('q') || '';

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products?category=men');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper for close match
  function closeMatch(a: string = '', b: string = '') {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return a.includes(b) || b.includes(a);
  }

  // Filter products by subcategory and search query
  let filteredProducts = activeSubcategory
    ? products.filter((p) => p.subcategory === activeSubcategory)
    : products;

  if (searchQueryParam) {
    const q = searchQueryParam.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      closeMatch(product.name, q) ||
      closeMatch(product.category, q) ||
      closeMatch(product.subcategory, q) ||
      closeMatch(product.description, q)
    );
  }

  // Sort products based on sortOption
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'alphabetical') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'priceLowHigh') {
      return a.price - b.price;
    } else if (sortOption === 'priceHighLow') {
      return b.price - a.price;
    }
    return 0;
  });

  // Listen for custom event to reset filter from Navbar
  useEffect(() => {
    const handler = () => setActiveSubcategory(null);
    window.addEventListener('resetMenFilter', handler);
    return () => window.removeEventListener('resetMenFilter', handler);
  }, []);

  // Reset filter when navigating to /shop/men
  useEffect(() => {
    if (pathname === '/shop/men') {
      setActiveSubcategory(null);
    }
  }, [pathname]);

  // Set filter from query param
  useEffect(() => {
    const subcategory = searchParams.get('subcategory');
    if (subcategory) {
      setActiveSubcategory(subcategory);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8" aria-label="Breadcrumb">
          <ol className="list-reset flex text-gray-500">
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li><span className="mx-2">&gt;</span></li>
            <li>
              <button
                className="text-black font-semibold hover:underline focus:outline-none"
                onClick={() => setActiveSubcategory(null)}
              >
                Mens
              </button>
            </li>
          </ol>
        </nav>

        {/* Category Circles Row */}
        <div className="flex justify-center space-x-8 px-8 pb-6 mb-2">
          {menCategories.map((cat) => {
            const isActive = activeSubcategory === cat.name;
            return (
              <div
                key={cat.name}
                className={`flex flex-col items-center group cursor-pointer transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}
                style={{ zIndex: isActive ? 1 : 0 }}
                onClick={() => {
                  // Update URL with subcategory, remove 'q' param
                  const params = new URLSearchParams(window.location.search);
                  params.delete('q');
                  if (isActive) {
                    // Remove subcategory and go to /shop/men
                    params.delete('subcategory');
                    router.push(`/shop/men`);
                  } else {
                    params.set('subcategory', cat.name);
                    router.push(`?${params.toString()}`);
                  }
                }}
              >
                <div className="w-20 h-20 rounded-full border-2 border-gray-300 overflow-hidden flex items-center justify-center bg-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                  <Image src={cat.image} alt={cat.name} width={80} height={80} className="object-cover w-full h-full" />
                </div>
                <span className="mt-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap transition-colors duration-300 group-hover:text-black">
                  {cat.name}
                </span>
                {isActive && (
                  <div className="w-10 h-1 bg-black rounded-full mt-2 transition-all duration-300" />
                )}
              </div>
            );
          })}
        </div>
        {/* Sorting Dropdown */}
        <div className="mb-6 flex items-center gap-2 font-sans" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
          <span className="text-sm text-gray-700 font-medium">Sort by:</span>
          <div className="min-w-[180px]">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full bg-white text-sm font-sans" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alphabetical">Alphabetical (A-Z)</SelectItem>
                <SelectItem value="priceLowHigh">Price: Low to High</SelectItem>
                <SelectItem value="priceHighLow">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 transition-all duration-500">
            {sortedProducts.map((product, index) => (
              <div key={product._id || product.id} className="transition-opacity duration-500 opacity-100">
                <ProductCard product={product} index={index} />
                <div className="mt-2 text-xs text-gray-500 font-semibold text-center" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
                  {product.subcategory}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';