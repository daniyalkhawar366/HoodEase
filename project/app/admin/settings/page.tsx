'use client';

import { useState } from 'react';
import { useSettingsStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function SettingsPage() {
  const {
    adminEmail, phone, supportEmail,
    showEmail, showPhone, showSupport,
    setSettings
  } = useSettingsStore();

  // Save handlers (simulate async save)
  const handleSaveContact = () => {
    setSettings({ adminEmail, phone, supportEmail });
    toast.success('Contact information updated successfully.');
  };
  const handleSaveDisplay = () => {
    setSettings({ showEmail, showPhone, showSupport });
    toast.success('User page display settings updated.');
  };

  return (
    <div className="space-y-8 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400">Manage your store's settings and preferences.</p>
      </div>
      <div className="w-full max-w-3xl space-y-8">
        {/* Contact Info */}
        <Card className="bg-gray-900 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>Contact Info</CardTitle>
            <CardDescription className="text-gray-400">Update admin and support contact details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email Address</Label>
              <Input id="adminEmail" type="email" value={adminEmail} onChange={e => setSettings({ adminEmail: e.target.value })} className="bg-gray-800 border-gray-600 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" value={phone} onChange={e => setSettings({ phone: e.target.value })} className="bg-gray-800 border-gray-600 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Customer Support Email</Label>
              <Input id="supportEmail" type="email" value={supportEmail} onChange={e => setSettings({ supportEmail: e.target.value })} className="bg-gray-800 border-gray-600 text-white" />
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-700 pt-6">
            <Button className="bg-white text-black hover:bg-gray-200" onClick={handleSaveContact}>Save Changes</Button>
          </CardFooter>
        </Card>

        {/* User Page Display Settings */}
        <Card className="bg-gray-900 border-gray-700 text-white">
          <CardHeader>
            <CardTitle>User Page Display Settings</CardTitle>
            <CardDescription className="text-gray-400">Control what contact info is visible to users.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Display Email on User Page</Label>
              <Switch checked={showEmail} onCheckedChange={v => setSettings({ showEmail: v })} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Display Phone Number on User Page</Label>
              <Switch checked={showPhone} onCheckedChange={v => setSettings({ showPhone: v })} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Display Support Email on User Page</Label>
              <Switch checked={showSupport} onCheckedChange={v => setSettings({ showSupport: v })} />
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-700 pt-6">
            <Button className="bg-white text-black hover:bg-gray-200" onClick={handleSaveDisplay}>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 