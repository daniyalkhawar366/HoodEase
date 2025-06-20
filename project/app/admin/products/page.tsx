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

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-white text-green-500 hover:bg-gray-100';
      case 'Out of Stock':
        return 'bg-white text-red-500 hover:bg-gray-100';
      case 'Low Stock':
        return 'bg-white text-yellow-500 hover:bg-gray-100';
      default:
        return 'bg-gray-700 text-white';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="text-gray-400">Manage your product inventory.</p>
        </div>
        <Button className="bg-white text-black hover:bg-gray-200">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      <Card className="bg-gray-900 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>All Products ({allProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800">
                <TableHead className="text-white">Product</TableHead>
                <TableHead className="text-white">Price</TableHead>
                <TableHead className="text-white">Stock</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProducts.map((product) => (
                <TableRow key={`${product.category}-${product.id}`} className="border-gray-700 hover:bg-gray-800">
                  <TableCell className="flex items-center gap-4">
                    <Image src={product.image} alt={product.name} width={40} height={40} className="rounded-md object-cover" />
                    <span className="font-medium">{product.name}</span>
                  </TableCell>
                  <TableCell>PKR {product.price.toLocaleString()}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge className={getStatusClasses(product.status)}>{product.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 