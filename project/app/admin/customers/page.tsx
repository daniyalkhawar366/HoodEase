'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
const inter = Inter({ subsets: ['latin'] });

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    { name: 'Ali Khan', email: 'ali.khan@example.com', totalSpent: 'PKR 25,450', joined: '2023-01-15', avatar: '/images/avatars/01.png', suspended: false },
    { name: 'Fatima Ahmed', email: 'fatima.ahmed@example.com', totalSpent: 'PKR 18,200', joined: '2023-02-20', avatar: '/images/avatars/02.png', suspended: false },
    { name: 'Zainab Bibi', email: 'zainab.bibi@example.com', totalSpent: 'PKR 32,000', joined: '2022-11-30', avatar: '/images/avatars/03.png', suspended: false },
    { name: 'Bilal Chaudhry', email: 'bilal.chaudhry@example.com', totalSpent: 'PKR 7,500', joined: '2023-03-10', avatar: '/images/avatars/04.png', suspended: false },
    { name: 'Sana Iqbal', email: 'sana.iqbal@example.com', totalSpent: 'PKR 45,900', joined: '2022-09-05', avatar: '/images/avatars/05.png', suspended: false },
  ]);

  const router = useRouter();

  const handleSuspend = (email: string) => {
    setCustomers(prev => prev.map(c => c.email === email ? { ...c, suspended: true } : c));
    toast({ title: 'Account Suspended', description: 'The customer account has been suspended.', variant: 'default' });
  };

  const handleReinstate = (email: string) => {
    setCustomers(prev => prev.map(c => c.email === email ? { ...c, suspended: false } : c));
    toast({ title: 'Account Reinstated', description: 'The customer account is now active.', variant: 'default' });
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
            {customers.map((customer) => (
              <tr
                key={customer.email}
                className={`border-b border-gray-800 hover:bg-[#23242a] transition-colors duration-150 group ${customer.suspended ? 'opacity-60' : ''}`}
              >
                <td className="px-6 py-4 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={customer.avatar} />
                    <AvatarFallback className="bg-gray-700 text-white font-semibold">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-white">{customer.name}</span>
                  {customer.suspended && <span className="ml-2 px-2 py-0.5 rounded-full bg-red-700 text-xs text-white">Suspended</span>}
                </td>
                <td className="px-6 py-4 text-gray-200">{customer.email}</td>
                <td className="px-6 py-4 text-gray-200">{customer.totalSpent}</td>
                <td className="px-6 py-4 text-gray-400">{customer.joined}</td>
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
                      {customer.suspended ? (
                        <DropdownMenuItem
                          onClick={() => handleReinstate(customer.email)}
                          className="text-green-500"
                        >
                          Reinstate Account
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => handleSuspend(customer.email)}
                          className="text-red-500"
                        >
                          Suspend Account
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 