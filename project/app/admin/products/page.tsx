'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { MoreVertical, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { products as productsMen } from '@/lib/products';
import { productsWomen } from '@/lib/products-women';
import { productsKids } from '@/lib/products-kids';
import { Inter } from 'next/font/google';
import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
const inter = Inter({ subsets: ['latin'] });

// Combine all products and add random stock
const allProducts = [...productsMen, ...productsWomen, ...productsKids].map(p => {
  const stock = Math.floor(Math.random() * 201); // Random stock between 0 and 200
  let status = 'In Stock';
  if (stock === 0) {
    status = 'Out of Stock';
  } else if (stock < 20) {
    status = 'Low Stock';
  }
  return { ...p, stock, status };
});

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [editFields, setEditFields] = useState({ price: '', stock: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const leftEdgeRef = useRef(null);

  // Sidebar auto-open on left edge hover
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX <= 2) {
        window.dispatchEvent(new CustomEvent('open-admin-sidebar'));
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products?limit=100');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error(error);
      toast.error('Could not load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditClick = (product: any) => {
    setEditProduct(product);
    setEditFields({
      price: product.price.toString(),
      stock: product.stock?.toString() || '0',
    });
    setModalOpen(true);
  };

  const handleFieldChange = (field: string, value: string) => {
    setEditFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!editProduct) return;

    try {
      const response = await fetch(`/api/products/${editProduct.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: Number(editFields.price),
          stock: Number(editFields.stock),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();

      setProducts((prev) =>
        prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
      );
      
      toast.success(`Product "${updatedProduct.name}" updated successfully.`);
      setModalOpen(false);
      setEditProduct(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update product.');
    }
  };

  const getStatus = (stock: number) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 20) return 'Low Stock';
    return 'In Stock';
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-900 text-green-400';
      case 'Out of Stock':
        return 'bg-red-900 text-red-400';
      case 'Low Stock':
        return 'bg-yellow-900 text-yellow-300';
      default:
        return 'bg-gray-800 text-gray-300';
    }
  };

  return (
    <div className={`min-h-screen bg-[#111215] p-4 md:p-8 ${inter.className} relative`}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-gray-400">Manage your product inventory.</p>
        </div>
        <button className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-full shadow-2xl hover:scale-105 hover:shadow-indigo-700/40 transition-all text-base font-semibold">
          <PlusCircle className="h-5 w-5" /> Add Product
        </button>
      </div>
      <div className="rounded-2xl shadow-xl bg-[#18191c] border border-gray-800 overflow-x-auto">
        <table className="min-w-full text-sm md:text-base">
          <thead className="sticky top-0 z-10 bg-[#18191c] border-b border-gray-800">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Product</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Price</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Stock</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Status</th>
              <th className="px-6 py-4 text-right font-semibold text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">Loading products...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">No products found.</td></tr>
            ) : (
              products.map((product) => {
                const status = getStatus(product.stock || 0);
                return (
                  <tr
                    key={product._id}
                    className="border-b border-gray-800 hover:bg-[#23242a] transition-colors duration-150 group"
                  >
                    <td className="px-6 py-4 flex items-center gap-4">
                      <Image src={product.image} alt={product.name} width={40} height={40} className="rounded-md object-cover shadow-sm" />
                      <span className="font-medium text-white">{product.name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-200">PKR {product.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-200">{product.stock || 0}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${getStatusClasses(status)}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="p-2 rounded-lg hover:bg-[#23242a] transition-colors">
                            <MoreVertical className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white min-w-[160px]">
                          <DropdownMenuItem onClick={() => handleEditClick(product)}>
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {/* Edit Product Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-[#18191c] border border-gray-700 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Price</label>
              <Input
                type="number"
                value={editFields.price}
                onChange={e => handleFieldChange('price', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Stock</label>
              <Input
                type="number"
                value={editFields.stock}
                onChange={e => handleFieldChange('stock', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 