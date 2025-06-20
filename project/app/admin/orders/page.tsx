import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function OrdersPage() {
  const orders = [
    { id: 'ORD001', customer: 'Ali Khan', date: '2024-07-21', total: 'PKR 5,999', status: 'Shipped' },
    { id: 'ORD002', customer: 'Fatima Ahmed', date: '2024-07-21', total: 'PKR 2,499', status: 'Processing' },
    { id: 'ORD003', customer: 'Zainab Bibi', date: '2024-07-20', total: 'PKR 8,999', status: 'Delivered' },
    { id: 'ORD004', customer: 'Bilal Chaudhry', date: '2024-07-20', total: 'PKR 1,200', status: 'Cancelled' },
    { id: 'ORD005', customer: 'Sana Iqbal', date: '2024-07-19', total: 'PKR 3,500', status: 'Shipped' },
  ];

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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Orders</h1>
        <p className="text-gray-400">Manage and view recent orders.</p>
      </div>
      <Card className="bg-gray-900 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800">
                <TableHead className="text-white">Order ID</TableHead>
                <TableHead className="text-white">Customer</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Total</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-gray-700 hover:bg-gray-800">
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <Badge className={getStatusClasses(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
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