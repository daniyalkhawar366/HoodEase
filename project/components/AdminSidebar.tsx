import Link from 'next/link';
import { Home, ShoppingBag, Users, BarChart2, Settings, LogOut, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/products', label: 'Products', icon: BarChart2 },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside
        className={`lg:sticky lg:top-0 lg:h-screen lg:z-40 flex flex-col w-64 bg-white border-r border-gray-200 py-8 px-4 space-y-2 shadow-lg transition-transform duration-300
          fixed left-0 top-0 z-50 h-screen
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static`}
      >
        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 lg:hidden text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>
        <div className="mb-8 flex items-center gap-2 px-2">
          <span className="text-2xl font-bold tracking-tight text-black">HoodEase</span>
        </div>
        <nav className="flex-1 space-y-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200
                ${pathname === href ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={onClose}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 w-full mt-8 bg-gray-100 text-gray-700 hover:bg-black hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </aside>
    </>
  );
} 