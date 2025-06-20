'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Inter } from 'next/font/google';
import { useState } from 'react';
const inter = Inter({ subsets: ['latin'] });

export default function OrdersPage() {
  const [orders, setOrders] = useState([
    { id: 'ORD001', customer: 'Ali Khan', date: '2024-07-21', total: 'PKR 5,999', status: 'Shipped' },
    { id: 'ORD002', customer: 'Fatima Ahmed', date: '2024-07-21', total: 'PKR 2,499', status: 'Processing' },
    { id: 'ORD003', customer: 'Zainab Bibi', date: '2024-07-20', total: 'PKR 8,999', status: 'Delivered' },
    { id: 'ORD004', customer: 'Bilal Chaudhry', date: '2024-07-20', total: 'PKR 1,200', status: 'Cancelled' },
    { id: 'ORD005', customer: 'Sana Iqbal', date: '2024-07-19', total: 'PKR 3,500', status: 'Shipped' },
  ]);

  const statusOptions = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'Cancelled':
        return 'bg-white text-red-500 hover:bg-gray-100';
      case 'Shipped':
        return 'bg-white text-black hover:bg-gray-100';
      case 'Delivered':
        return 'bg-white text-green-500 hover:bg-gray-100';
      case 'Processing':
        return 'bg-black text-white border border-gray-600 hover:bg-gray-800';
      default:
        return 'bg-gray-700 text-white';
    }
  };

  return (
    <div className={`min-h-screen bg-[#111215] p-4 md:p-8 ${inter.className}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Orders</h1>
        <p className="text-gray-400">Manage and view recent orders.</p>
      </div>
      <div className="rounded-2xl shadow-xl bg-[#18191c] border border-gray-800 overflow-x-auto">
        <table className="min-w-full text-sm md:text-base">
          <thead className="sticky top-0 z-10 bg-[#18191c] border-b border-gray-800">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Order ID</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Customer</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Date</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Total</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Status</th>
              <th className="px-6 py-4 text-right font-semibold text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-800 hover:bg-[#23242a] transition-colors duration-150 group"
              >
                <td className="px-6 py-4 whitespace-nowrap text-white font-mono">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-200">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-400">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-200">{order.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold shadow-sm
                      ${order.status === 'Delivered' ? 'bg-green-900 text-green-400' :
                        order.status === 'Processing' ? 'bg-yellow-900 text-yellow-300' :
                        order.status === 'Cancelled' ? 'bg-red-900 text-red-400' :
                        order.status === 'Shipped' ? 'bg-blue-900 text-blue-300' :
                        'bg-gray-800 text-gray-300'}
                    `}
                  >
                    {order.status}
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
                      <div className="px-2 py-1 text-xs text-gray-400">Update Status</div>
                      {statusOptions.map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => handleStatusChange(order.id, status)}
                          className={
                            'flex items-center gap-2 ' +
                            (order.status === status ? 'bg-blue-900 text-blue-300' : '')
                          }
                        >
                          {order.status === status && <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />}
                          {status}
                        </DropdownMenuItem>
                      ))}
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