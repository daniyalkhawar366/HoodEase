'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const statusOptions = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders?type=past');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error('Could not load order history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Refetch orders to reflect the change
      fetchOrders();
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update order status.');
    }
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'Cancelled':
        return 'bg-red-900 text-red-400';
      case 'Shipped':
        return 'bg-blue-900 text-blue-300';
      case 'Delivered':
        return 'bg-green-900 text-green-400';
      case 'Processing':
        return 'bg-yellow-900 text-yellow-300';
      default:
        return 'bg-gray-800 text-gray-300';
    }
  };

  const getCustomerName = (order: any) => {
    if (order.customerName) {
      return order.customerName;
    }
    if (order.userId && typeof order.userId === 'object') {
      return `${order.userId.firstName || ''} ${order.userId.lastName || ''}`.trim();
    }
    return 'N/A';
  };

  const getCustomerEmail = (order: any) => {
    if (order.email) {
      return order.email;
    }
    if (order.userId && typeof order.userId === 'object') {
      return order.userId.email || 'N/A';
    }
    return 'N/A';
  };

  return (
    <div className={`min-h-screen bg-[#111215] p-4 md:p-8 ${inter.className}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Order History</h1>
        <p className="text-gray-400">View completed and cancelled orders.</p>
      </div>
      <div className="rounded-2xl shadow-xl bg-[#18191c] border border-gray-800 overflow-x-auto">
        <table className="min-w-full text-sm md:text-base">
          <thead className="sticky top-0 z-10 bg-[#18191c] border-b border-gray-800">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Order ID</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Customer</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Email</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Date</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Total</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-300">Status</th>
              <th className="px-6 py-4 text-right font-semibold text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                  Loading order history...
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                  No past orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-800 hover:bg-[#23242a] transition-colors duration-150 group"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-white font-mono">{order.orderId || order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200">{getCustomerName(order)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">{getCustomerEmail(order)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                    PKR {order.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${getStatusClasses(
                        order.status
                      )}`}
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
                            onClick={() => handleStatusChange(order._id, status)}
                            disabled={order.status === status}
                            className={
                              'flex items-center gap-2 cursor-pointer ' +
                              (order.status === status
                                ? 'bg-blue-900 text-blue-300'
                                : 'hover:bg-gray-800')
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 