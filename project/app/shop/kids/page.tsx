'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const kidsCategories = [
  { 
    name: 'Graphic Shirts',
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750243791/graphick_gkjeqk.jpg' 
  },
  { 
    name: 'Casual Shirts',
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750243786/casualk_l91hko.webp' 
  },
  { 
    name: 'Cartoon Shirts',
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750243784/cartoon_zhwnhz.webp' 
  },
  { 
    name: 'Party Shirts',
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750243785/party_haqmjz.webp' 
  },
  { 
    name: 'Flannel Shirts',
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750243783/flannelk_h5cc1a.jpg' 
  },
];

export default function KidsShopPage() {
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
        const response = await fetch('/api/products?category=kids');
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

  useEffect(() => {
    const handler = () => setActiveSubcategory(null);
    window.addEventListener('resetKidsFilter', handler);
    return () => window.removeEventListener('resetKidsFilter', handler);
  }, []);

  useEffect(() => {
    if (pathname === '/shop/kids') {
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
                Kids
              </button>
            </li>
          </ol>
        </nav>

        {/* Category Circles Row */}
        <div className="flex overflow-x-auto no-scrollbar space-x-4 px-2 pb-6 mb-2 w-full">
          {kidsCategories.map((cat) => {
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
                    params.delete('subcategory');
                    router.push(`/shop/kids`);
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
        {!loading && filteredProducts.length === 0 && searchQueryParam ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] py-12">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">No items found</h2>
            <p className="text-gray-500 text-lg">
              We couldn't find any products matching <span className="font-semibold">"{searchQueryParam}"</span>.
            </p>
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