'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { MoreVertical, PlusCircle, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { products as productsMen } from '@/lib/products';
import { productsWomen } from '@/lib/products-women';
import { productsKids } from '@/lib/products-kids';
import { Inter } from 'next/font/google';
import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

// Category and subcategory options
const categories = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' }
];

const subcategories = {
  men: [
    'Casual Shirts', 'Dress Shirts', 'Polo Shirts', 'Printed Shirts', 
    'Denim Shirts', 'Linen Shirts', 'Oversized Shirts', 'Flannel Shirts', 
    'Striped Shirts', 'T-Shirts'
  ],
  women: [
    'Casual Shirts', 'Dress Shirts', 'Printed Shirts', 
    'Linen Shirts', 'Oversized Shirts', 'Flannel Shirts'
  ],
  kids: [
    'Graphic Shirts', 'Casual Shirts', 'Cartoon Shirts', 
    'Party Shirts', 'Flannel Shirts'
  ]
};

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = ['Black', 'White', 'Gray', 'Navy', 'Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange', 'Brown', 'Beige', 'Olive'];

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
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const leftEdgeRef = useRef(null);

  // Add product form state
  const [addProductForm, setAddProductForm] = useState({
    name: '',
    price: '',
    category: '',
    subcategory: '',
    description: '',
    colors: [] as string[],
    sizes: [] as string[],
    stock: '0'
  });

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

  // Image upload handlers
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async (): Promise<string> => {
    if (!imageFile) {
      throw new Error('No image selected');
    }

    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.url;
  };

  // Add product handlers
  const handleAddProductFormChange = (field: string, value: any) => {
    setAddProductForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = async () => {
    try {
      if (!imageFile) {
        toast.error('Please select an image for the product');
        return;
      }

      // Upload image first
      const imageUrl = await handleImageUpload();

      // Create product data
      const productData = {
        name: addProductForm.name,
        price: Number(addProductForm.price),
        category: addProductForm.category,
        subcategory: addProductForm.subcategory,
        description: addProductForm.description,
        image: imageUrl,
        images: [imageUrl],
        colors: addProductForm.colors,
        sizes: addProductForm.sizes,
        stock: Number(addProductForm.stock),
        slug: addProductForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        isActive: true
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const newProduct = await response.json();
      setProducts(prev => [newProduct, ...prev]);
      
      toast.success(`Product "${newProduct.name}" created successfully.`);
      setAddProductModalOpen(false);
      resetAddProductForm();
    } catch (error) {
      console.error(error);
      toast.error('Failed to create product.');
    }
  };

  const resetAddProductForm = () => {
    setAddProductForm({
      name: '',
      price: '',
      category: '',
      subcategory: '',
      description: '',
      colors: [],
      sizes: [],
      stock: '0'
    });
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
        <button 
          onClick={() => setAddProductModalOpen(true)}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-full shadow-2xl hover:scale-105 hover:shadow-indigo-700/40 transition-all text-base font-semibold"
        >
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

      {/* Add Product Modal */}
      <Dialog open={addProductModalOpen} onOpenChange={setAddProductModalOpen}>
        <DialogContent className="bg-[#18191c] border border-gray-700 rounded-xl max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Product Name</Label>
                <Input
                  value={addProductForm.name}
                  onChange={(e) => handleAddProductFormChange('name', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <Label className="text-gray-300">Price (PKR)</Label>
                <Input
                  type="number"
                  value={addProductForm.price}
                  onChange={(e) => handleAddProductFormChange('price', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Category</Label>
                <Select value={addProductForm.category} onValueChange={(value) => handleAddProductFormChange('category', value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value} className="text-white">
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Subcategory</Label>
                <Select 
                  value={addProductForm.subcategory} 
                  onValueChange={(value) => handleAddProductFormChange('subcategory', value)}
                  disabled={!addProductForm.category}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {addProductForm.category && subcategories[addProductForm.category as keyof typeof subcategories]?.map((sub) => (
                      <SelectItem key={sub} value={sub} className="text-white">
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Description</Label>
              <Textarea
                value={addProductForm.description}
                onChange={(e) => handleAddProductFormChange('description', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Enter product description"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-gray-300">Stock Quantity</Label>
              <Input
                type="number"
                value={addProductForm.stock}
                onChange={(e) => handleAddProductFormChange('stock', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="0"
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label className="text-gray-300">Product Image</Label>
              <div className="mt-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Image
                </Button>
                {imagePreview && (
                  <div className="mt-4 relative">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={200}
                      height={200}
                      className="rounded-lg object-cover"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setImagePreview('');
                        setImageFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Colors and Sizes */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Available Colors</Label>
                <div className="mt-2 max-h-32 overflow-y-auto bg-gray-800 border border-gray-600 rounded-md p-2">
                  {colors.map((color) => (
                    <label key={color} className="flex items-center space-x-2 text-white">
                      <input
                        type="checkbox"
                        checked={addProductForm.colors.includes(color)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleAddProductFormChange('colors', [...addProductForm.colors, color]);
                          } else {
                            handleAddProductFormChange('colors', addProductForm.colors.filter(c => c !== color));
                          }
                        }}
                        className="rounded"
                      />
                      <span>{color}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-gray-300">Available Sizes</Label>
                <div className="mt-2 max-h-32 overflow-y-auto bg-gray-800 border border-gray-600 rounded-md p-2">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center space-x-2 text-white">
                      <input
                        type="checkbox"
                        checked={addProductForm.sizes.includes(size)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleAddProductFormChange('sizes', [...addProductForm.sizes, size]);
                          } else {
                            handleAddProductFormChange('sizes', addProductForm.sizes.filter(s => s !== size));
                          }
                        }}
                        className="rounded"
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleAddProduct}
              className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800"
              disabled={!addProductForm.name || !addProductForm.price || !addProductForm.category || !addProductForm.subcategory || !imageFile}
            >
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 