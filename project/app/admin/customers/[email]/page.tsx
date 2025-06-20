"use client";

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const mockCustomers = [
  { name: 'Ali Khan', email: 'ali.khan@example.com', totalSpent: 'PKR 25,450', joined: '2023-01-15', avatar: '/images/avatars/01.png', suspended: false },
  { name: 'Fatima Ahmed', email: 'fatima.ahmed@example.com', totalSpent: 'PKR 18,200', joined: '2023-02-20', avatar: '/images/avatars/02.png', suspended: false },
  { name: 'Zainab Bibi', email: 'zainab.bibi@example.com', totalSpent: 'PKR 32,000', joined: '2022-11-30', avatar: '/images/avatars/03.png', suspended: false },
  { name: 'Bilal Chaudhry', email: 'bilal.chaudhry@example.com', totalSpent: 'PKR 7,500', joined: '2023-03-10', avatar: '/images/avatars/04.png', suspended: false },
  { name: 'Sana Iqbal', email: 'sana.iqbal@example.com', totalSpent: 'PKR 45,900', joined: '2022-09-05', avatar: '/images/avatars/05.png', suspended: false },
];

const mockOrders = [
  { id: 'ORD001', date: '2024-07-21', total: 'PKR 5,999', status: 'Shipped' },
  { id: 'ORD003', date: '2024-07-20', total: 'PKR 8,999', status: 'Delivered' },
];

export default function CustomerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const email = decodeURIComponent(params.email as string);
  const customer = mockCustomers.find(c => c.email === email);

  if (!customer) {
    return <div className="text-center text-white p-12">Customer not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#111215] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <Card className="bg-gray-900 border-gray-700 text-white mb-8">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src={customer.avatar} />
              <AvatarFallback className="bg-gray-700 text-white font-semibold">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{customer.name}</CardTitle>
              <div className="text-gray-400 text-sm">{customer.email}</div>
              <div className="text-gray-400 text-sm">Joined: {customer.joined}</div>
              <div className="text-gray-400 text-sm">Total Spent: {customer.totalSpent}</div>
              {customer.suspended && <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-red-700 text-xs text-white">Suspended</span>}
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="mr-2" onClick={() => router.back()}>Back</Button>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-white">Order ID</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Total</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map(order => (
                  <TableRow key={order.id} className="border-gray-700">
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 