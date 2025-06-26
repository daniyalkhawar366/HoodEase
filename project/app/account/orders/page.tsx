'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MyOrdersPage() {
  const { user, isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?._id) {
      setLoading(true);
      fetch(`/api/orders?userId=${user._id}`)
        .then(res => res.json())
        .then(data => setOrders(Array.isArray(data) ? data : []))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        <p>Please <Link href="/" className="text-blue-600 underline">login</Link> to view your orders.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 max-w-4xl pt-24">
      <h2 className="text-2xl font-bold mb-8">My Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <span className="text-2xl font-bold text-gray-400">You have no orders yet.</span>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order, idx) => (
            <div key={order._id || idx} className="border rounded-lg p-6 bg-white shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <div className="text-lg font-semibold">Order #{order.orderId}</div>
                  <div className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex flex-col md:items-end mt-2 md:mt-0">
                  <span className="font-semibold text-brand-600">Status: {order.status}</span>
                  <span className="text-sm text-gray-500">Payment: {order.paymentStatus}</span>
                  <span className="text-sm text-gray-500">Total: PKR {order.totalAmount.toLocaleString('en-PK')}</span>
                </div>
              </div>
              <div className="mb-2">
                <span className="font-medium">Shipping Address:</span> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zipCode}, {order.shippingAddress.country}
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">Image</th>
                      <th className="p-2 border">Product</th>
                      <th className="p-2 border">Color</th>
                      <th className="p-2 border">Size</th>
                      <th className="p-2 border">Qty</th>
                      <th className="p-2 border">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item: any, i: number) => (
                      <tr key={i}>
                        <td className="p-2 border"><img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" /></td>
                        <td className="p-2 border">{item.name}</td>
                        <td className="p-2 border">{item.selectedColor}</td>
                        <td className="p-2 border">{item.selectedSize}</td>
                        <td className="p-2 border">{item.quantity}</td>
                        <td className="p-2 border">PKR {item.price.toLocaleString('en-PK')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {order.trackingNumber && (
                <div className="mt-2 text-sm text-gray-600">Tracking #: {order.trackingNumber}</div>
              )}
              {order.notes && (
                <div className="mt-2 text-sm text-gray-600">Notes: {order.notes}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 