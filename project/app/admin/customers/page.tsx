import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function CustomersPage() {
  const customers = [
    { name: 'Ali Khan', email: 'ali.khan@example.com', totalSpent: 'PKR 25,450', joined: '2023-01-15', avatar: '/images/avatars/01.png' },
    { name: 'Fatima Ahmed', email: 'fatima.ahmed@example.com', totalSpent: 'PKR 18,200', joined: '2023-02-20', avatar: '/images/avatars/02.png' },
    { name: 'Zainab Bibi', email: 'zainab.bibi@example.com', totalSpent: 'PKR 32,000', joined: '2022-11-30', avatar: '/images/avatars/03.png' },
    { name: 'Bilal Chaudhry', email: 'bilal.chaudhry@example.com', totalSpent: 'PKR 7,500', joined: '2023-03-10', avatar: '/images/avatars/04.png' },
    { name: 'Sana Iqbal', email: 'sana.iqbal@example.com', totalSpent: 'PKR 45,900', joined: '2022-09-05', avatar: '/images/avatars/05.png' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Customers</h1>
        <p className="text-gray-400">View and manage your customers.</p>
      </div>
      <Card className="bg-gray-900 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-800">
                <TableHead className="text-white">Customer</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Total Spent</TableHead>
                <TableHead className="text-white">Joined</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.email} className="border-gray-700 hover:bg-gray-800">
                  <TableCell className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={customer.avatar} />
                      <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{customer.name}</span>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.totalSpent}</TableCell>
                  <TableCell>{customer.joined}</TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>View Orders</DropdownMenuItem>
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