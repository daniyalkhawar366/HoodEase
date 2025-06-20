'use client';

import { BarChart3, Package, DollarSign, ShoppingCart, Users } from 'lucide-react';
import StatCard from '@/components/StatCard';
import SalesChart from '@/components/SalesChart';
import ItemSalesChart from '@/components/ItemSalesChart';
import SalesSegmentationChart from '@/components/SalesSegmentationChart';

export default function AdminDashboardPage() {
  const stats = [
    {
      title: 'Total Revenue',
      value: 'PKR 45,231',
      change: '+20.1%',
      changeType: 'up' as const,
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: 'Orders',
      value: '2,350',
      change: '+180.1%',
      changeType: 'up' as const,
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: 'Products',
      value: '12,234',
      change: '+19%',
      changeType: 'up' as const,
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: 'Active Users',
      value: '573',
      change: '+201',
      changeType: 'up' as const,
      icon: <Users className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">A quick overview of your store's performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <SalesChart />
          </div>
        </div>
        <div className="lg:col-span-1">
          <SalesSegmentationChart />
        </div>
      </div>

      {/* Item Sales Chart */}
      <div className="grid grid-cols-1 gap-6">
        <ItemSalesChart />
      </div>
    </div>
  );
} 