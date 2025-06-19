'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { useAuthStore } from '@/store/useAuthStore';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import AuthModal from './AuthModal';

interface NavbarProps {
  toggleSidebar: () => void;
  isStatic?: boolean;
}

export default function Navbar({ toggleSidebar, isStatic = false }: NavbarProps) {
  const { getTotalItems, toggleCart } = useStore();
  const { user, isAuthenticated, isAdmin, login, signup, logout } = useAuthStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const totalItems = getTotalItems();
  const pathname = usePathname();

  const isLandingPage = pathname === '/';
  const isAdminPage = pathname === '/admin';

  const textColorClass = isAdminPage ? 'text-white' : (isLandingPage ? 'text-white' : 'text-black');
  const hoverTextColorClass = isAdminPage ? 'hover:text-gray-200' : (isLandingPage ? 'hover:text-gray-200' : 'hover:text-gray-700');
  const logoHoverOpacityClass = 'hover:opacity-70';
  const underlineColorClass = isAdminPage ? 'bg-white' : (isLandingPage ? 'bg-white' : 'bg-black');

  const handleLogin = (email: string, password: string) => {
    const success = login(email, password);
    if (success) {
      setIsAuthModalOpen(false);
      if (isAdmin) {
        // Redirect to admin dashboard
        window.location.href = '/admin';
      }
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleSignup = (userData: any) => {
    try {
      signup(userData);
      setIsAuthModalOpen(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    logout();
    if (isAdmin) {
      window.location.href = '/';
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${isStatic ? 'static w-full' : 'fixed top-0 left-0 right-0'} z-50`}
      >
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className={`${textColorClass} ${hoverTextColorClass} hover:bg-transparent h-10 w-10 transition-colors duration-300`}
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link 
              href="/" 
              className={`${textColorClass} text-2xl font-bold ${logoHoverOpacityClass} transition-opacity duration-300 minimal-text relative group`}
            >
              HOODEASE
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${underlineColorClass} transition-all duration-300 group-hover:w-full`}></span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/shop/men" 
              className={`${isLandingPage ? 'text-white hover:text-gray-200' : 'text-black/80 hover:text-gray-700'} transition-colors duration-300 minimal-text text-sm relative group`}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('resetMenFilter'));
                }
              }}
            >
              MEN
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${underlineColorClass} transition-all duration-300 group-hover:w-full`}></span>
            </Link>
            <Link 
              href="/shop/women" 
              className={`${isLandingPage ? 'text-white hover:text-gray-200' : 'text-black/80 hover:text-gray-700'} transition-colors duration-300 minimal-text text-sm relative group`}
            >
              WOMEN
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${underlineColorClass} transition-all duration-300 group-hover:w-full`}></span>
            </Link>
            <Link 
              href="/shop/kids" 
              className={`${isLandingPage ? 'text-white hover:text-gray-200' : 'text-black/80 hover:text-gray-700'} transition-colors duration-300 minimal-text text-sm relative group`}
            >
              KIDS
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${underlineColorClass} transition-all duration-300 group-hover:w-full`}></span>
            </Link>
            <Link 
              href="/about" 
              className={`${isLandingPage ? 'text-white hover:text-gray-200' : 'text-black/80 hover:text-gray-700'} transition-colors duration-300 minimal-text text-sm relative group`}
            >
              ABOUT
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${underlineColorClass} transition-all duration-300 group-hover:w-full`}></span>
            </Link>
            <Link 
              href="/contact" 
              className={`${isLandingPage ? 'text-white hover:text-gray-200' : 'text-black/80 hover:text-gray-700'} transition-colors duration-300 minimal-text text-sm relative group`}
            >
              CONTACT
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${underlineColorClass} transition-all duration-300 group-hover:w-full`}></span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className={`${textColorClass} text-sm font-medium`}>
                  Hi, {user?.firstName}
                </span>
                {isAdmin && (
                  <Link href="/admin">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={`bg-black text-white border-black hover:bg-white hover:text-black transition-all duration-300`}
                    >
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className={`${textColorClass} ${hoverTextColorClass} hover:bg-transparent h-8 w-8 transition-colors duration-300`}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => setIsAuthModalOpen(true)}
                  className={`${textColorClass} ${hoverTextColorClass} hover:bg-transparent transition-colors duration-300 minimal-text text-sm`}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAuthModalOpen(true)}
                  className={`bg-black text-white border-black transition-all duration-300 minimal-text text-sm`}
                  style={{
                    '--tw-bg-opacity': '1',
                    '--tw-text-opacity': '1'
                  } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#000000';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className={`relative ${textColorClass} ${hoverTextColorClass} hover:bg-transparent h-10 w-10 transition-colors duration-300`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span
                suppressHydrationWarning
                className={`absolute -top-1 -right-1 ${isLandingPage ? 'bg-white text-black' : 'bg-black text-white'} text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold transition-opacity duration-200 ${totalItems > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                aria-hidden={totalItems === 0}
              >
                {totalItems}
              </span>
            </Button>
          </div>
        </div>
      </motion.nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </>
  );
}