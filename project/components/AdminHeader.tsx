import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserCircle, Plus } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-6 bg-white border-b border-gray-200 sticky top-0 z-30 w-full">
      <div className="flex-1 max-w-xl">
        <Input
          type="text"
          placeholder="Search orders, users, products..."
          className="w-full bg-gray-100 border-gray-200 text-black placeholder:text-gray-500"
        />
      </div>
      <div className="flex items-center gap-4 ml-4 md:ml-8">
        <Button className="bg-black text-white hover:bg-gray-900 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Product</span>
        </Button>
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <UserCircle className="h-8 w-8 text-gray-500" />
        </div>
      </div>
    </header>
  );
} 