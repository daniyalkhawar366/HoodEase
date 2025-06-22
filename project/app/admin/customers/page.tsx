'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data.map((c: any) => ({ ...c, totalSpent: Math.floor(Math.random() * 50000) }))); // Add random spend for demo
    } catch (error) {
      console.error(error);
      toast.error('Could not load customers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleToggleSuspend = async (customer: any) => {
    const isSuspended = !customer.isSuspended;
    try {
      const response = await fetch(`/api/users/${customer._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isSuspended }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedCustomer = await response.json();
      setCustomers(prev => prev.map(c => c._id === customer._id ? updatedCustomer : c));
      toast.success(isSuspended ? 'Account suspended.' : 'Account reinstated.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update customer status.');
    }
  };

  const handleViewProfile = (email: string) => {
    router.push(`/admin/customers/${encodeURIComponent(email)}`);
  };

  return (
    <div className={`min-h-screen bg-[#111215] p-4 md:p-8 ${inter.className}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Customers</h1>
        <p className="text-gray-400">View and manage your customers.</p>
      </div>
      <div className="rounded-2xl shadow-xl bg-[#18191c] border border-gray-800 overflow-x-auto">
        <table className="min-w-full text-sm md:text-base">
          <thead className="sticky top-0 z-10 bg-[#18191c] border-b border-gray-800">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Customer</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Email</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Total Spent</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Joined</th>
              <th className="px-6 py-4 text-right font-semibold text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">Loading customers...</td></tr>
            ) : (
              customers.map((customer) => (
                <tr
                  key={customer._id}
                  className={`border-b border-gray-800 hover:bg-[#23242a] transition-colors duration-150 group ${customer.isSuspended ? 'opacity-60' : ''}`}
                >
                  <td className="px-6 py-4 flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={customer.avatar || ''} />
                      <AvatarFallback className="bg-gray-700 text-white font-semibold">
                        {customer.firstName?.[0]}{customer.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-white">{customer.firstName} {customer.lastName}</span>
                    {customer.isSuspended && <span className="ml-2 px-2 py-0.5 rounded-full bg-red-700 text-xs text-white">Suspended</span>}
                  </td>
                  <td className="px-6 py-4 text-gray-200">{customer.email}</td>
                  <td className="px-6 py-4 text-gray-200">PKR {customer.totalSpent.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-400">{new Date(customer.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="p-2 rounded-lg hover:bg-[#23242a] transition-colors">
                          <MoreVertical className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white min-w-[160px]">
                        <DropdownMenuItem onClick={() => handleViewProfile(customer.email)}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleSuspend(customer)}
                          className={customer.isSuspended ? "text-green-500" : "text-red-500"}
                        >
                          {customer.isSuspended ? 'Reinstate Account' : 'Suspend Account'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 