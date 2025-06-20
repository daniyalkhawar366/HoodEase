'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400">Manage your store's settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Store Details */}
          <Card className="bg-gray-900 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>Store Details</CardTitle>
              <CardDescription className="text-gray-400">Update your store's public information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input id="storeName" defaultValue="HoodEase" className="bg-gray-800 border-gray-600 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeEmail">Contact Email</Label>
                <Input id="storeEmail" type="email" defaultValue="contact@hoodease.com" className="bg-gray-800 border-gray-600 text-white" />
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-700 pt-6">
              <Button className="bg-white text-black hover:bg-gray-200">Save Changes</Button>
            </CardFooter>
          </Card>

          {/* Maintenance Mode */}
          <Card className="bg-gray-900 border-gray-700 text-white">
            <CardHeader>
              <CardTitle>Maintenance Mode</CardTitle>
              <CardDescription className="text-gray-400">Temporarily disable public access to your store.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor="maintenanceMode" className="flex flex-col space-y-1">
                  <span>Enable Maintenance Mode</span>
                  <span className="text-xs text-gray-400">
                    When enabled, only admins can access the storefront.
                  </span>
                </Label>
                <Switch id="maintenanceMode" />
              </div>
            </CardContent>
             <CardFooter className="border-t border-gray-700 pt-6">
              <Button variant="destructive" className="text-white">Enable Now</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 