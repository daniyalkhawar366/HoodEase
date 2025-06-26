'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';

export default function AccountPage() {
  const { user, setUser } = useAuthStore((state: any) => ({ user: state.user, setUser: state.setUser }));
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: user?.address || '',
    dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.slice(0, 10) : '',
  });
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
        <p>Please login to view your account.</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const updated = await res.json();
        setUser && setUser(updated.user);
        toast.success('Account updated successfully!');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to update account');
      }
    } catch (e) {
      toast.error('Failed to update account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-lg pt-24 px-2 sm:px-0">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Account Settings</h2>
        <Link href="/account/orders">
          <Button>My Orders</Button>
        </Link>
      </div>
      <div className="space-y-6">
        <div className="mb-2">
          <label className="block font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-3 mb-2 focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-3 mb-2 focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-3 mb-2 focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            className="w-full border rounded px-3 py-3 mb-2 focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border rounded px-3 py-3 mb-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
        <Button className="w-full mt-4" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
} 