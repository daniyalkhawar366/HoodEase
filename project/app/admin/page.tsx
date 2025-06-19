'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, Users, Package, DollarSign, ShoppingCart, Menu } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import StatCard from '@/components/StatCard';
import SalesChart from '@/components/SalesChart';
import ItemSalesChart from '@/components/ItemSalesChart';
import SalesSegmentationChart from '@/components/SalesSegmentationChart';

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
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
    <div className="min-h-screen bg-black">
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-h-screen w-full">
          <AdminHeader />
          <main className="flex-1 p-6">
            {/* Sidebar toggle button for mobile only */}
            <button
              className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-black rounded-lg shadow-sm p-6 border border-gray-700">
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
          </main>
        </div>
      </div>
    </div>
  );
} 