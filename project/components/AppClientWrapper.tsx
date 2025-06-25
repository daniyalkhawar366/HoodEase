'use client';

import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import { useSettingsStore } from '@/store/useStore';
import { useAuthStore } from '@/store/useAuthStore';

export default function AppClientWrapper({ children }: { children: React.ReactNode }) {
  const { maintenance } = useSettingsStore();
  const { isAdmin } = useAuthStore();

  if (maintenance && !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div className="max-w-lg p-8 rounded-2xl shadow-2xl bg-gray-900 border border-gray-700 text-center">
          <h1 className="text-4xl font-bold mb-4">🚧 Maintenance Mode</h1>
          <p className="text-lg mb-6">Our site is currently undergoing scheduled maintenance.<br />We'll be back soon. Thank you for your patience!</p>
          <div className="animate-pulse text-6xl mb-2">🛠️</div>
          <p className="text-gray-400">If you need urgent help, please contact support@hoodease.com</p>
        </div>
      </div>
    );
  }

  return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>;
} 