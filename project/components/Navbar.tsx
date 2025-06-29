'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Menu, LogOut, Heart, User as UserIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useSearchStore } from '@/store/useSearchStore';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import { toast } from 'sonner';

interface NavbarProps {
  toggleSidebar: () => void;
  isStatic?: boolean;
}

export default function Navbar({ toggleSidebar, isStatic = false }: NavbarProps) {
  const router = useRouter();
  const { cart, toggleCart } = useStore();
  const { 
    user, 
    isAuthenticated, 
    isAdmin, 
    login, 
    signup, 
    logout, 
    openAuthModal 
  } = useAuthStore();
  const { toggleCategorySearch } = useSearchStore();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const pathname = usePathname();

  const isLandingPage = pathname === '/';
  const isAdminPage = pathname === '/admin';
  const isShopPage = pathname.startsWith('/shop');

  const textColorClass = isAdminPage ? 'text-white' : (isLandingPage ? 'text-white' : 'text-black');
  const hoverTextColorClass = isAdminPage ? 'hover:text-gray-200' : (isLandingPage ? 'hover:text-gray-200' : 'hover:text-gray-700');
  const logoHoverOpacityClass = 'hover:opacity-70';
  const underlineColorClass = isAdminPage ? 'bg-white' : (isLandingPage ? 'bg-white' : 'bg-black');

  const isMenActive = pathname.startsWith('/shop/men');
  const isWomenActive = pathname.startsWith('/shop/women');
  const isKidsActive = pathname.startsWith('/shop/kids');

  // Handle scroll behavior for showing/hiding navbar and changing background
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Background change on scroll
      if (currentScrollY > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      // Show/hide on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsNavbarVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result.user) {
      // Admin check is now handled within the store, redirect if isAdmin is true
      if (result.user.email === 'Admin@Hoodease.com') {
        router.push('/admin');
      }
    }
    return result;
  };

  const handleSignup = async (userData: any) => {
    return await signup(userData);
  };

  const handleLogout = () => {
    logout();
    if (isAdmin) {
      router.push('/');
    }
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      toggleCart();
    } else {
      openAuthModal('login');
    }
  };

  const handleSearchClick = () => {
    toggleCategorySearch();
  };

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: isStatic ? 0 : (isNavbarVisible ? 0 : -100)
        }}
        transition={{ duration: 0.3 }}
        className={`${isStatic ? 'static w-full' : 'fixed top-0 left-0 right-0'} z-50 transition-colors duration-300 ${isLandingPage && !hasScrolled ? 'bg-transparent' : 'bg-white/95 backdrop-blur-sm border-b border-gray-200'}`}
      >
        <div className="container mx-auto px-2 sm:px-6 py-3 md:py-6 flex flex-wrap items-center justify-between gap-y-2 gap-x-2">
          <div className="flex items-center gap-x-2 sm:gap-x-4">
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
          
          <div className="hidden md:flex items-center gap-x-4">
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
              <span className={`absolute bottom-0 left-0 h-0.5 ${underlineColorClass} transition-all duration-300 ${isMenActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
            <Link 
              href="/shop/women" 
              className={`${isLandingPage ? 'text-white hover:text-gray-200' : 'text-black/80 hover:text-gray-700'} transition-colors duration-300 minimal-text text-sm relative group`}
            >
              WOMEN
              <span className={`absolute bottom-0 left-0 h-0.5 ${underlineColorClass} transition-all duration-300 ${isWomenActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
            <Link 
              href="/shop/kids" 
              className={`${isLandingPage ? 'text-white hover:text-gray-200' : 'text-black/80 hover:text-gray-700'} transition-colors duration-300 minimal-text text-sm relative group`}
            >
              KIDS
              <span className={`absolute bottom-0 left-0 h-0.5 ${underlineColorClass} transition-all duration-300 ${isKidsActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
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
            {isShopPage && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSearchClick}
                className={`${textColorClass} ${hoverTextColorClass} hover:bg-transparent h-8 w-8 transition-colors duration-300`}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            {isAuthenticated && !isAdmin ? (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${textColorClass} ${hoverTextColorClass} hover:bg-transparent h-8 w-8 transition-colors duration-300`}
                  asChild
                >
                  <Link href="/account" aria-label="Account">
                    <UserIcon className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${textColorClass} ${hoverTextColorClass} hover:bg-transparent h-8 w-8 transition-colors duration-300`}
                  asChild
                >
                  <Link href="/wishlist" aria-label="Wishlist">
                    <Heart className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCartClick}
                  className={`${textColorClass} ${hoverTextColorClass} hover:bg-transparent h-8 w-8 transition-colors duration-300 relative`}
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                      {totalItems}
                    </span>
                  )}
                </Button>
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
                  onClick={() => openAuthModal('login')}
                  className={`${textColorClass} ${hoverTextColorClass} hover:bg-transparent transition-colors duration-300 minimal-text text-sm`}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openAuthModal('signup')}
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
          </div>

          {/* Mobile menu */}
          <div className="flex md:hidden items-center gap-x-2 mt-2 w-full justify-end">
            {/* Add your mobile menu here, e.g., a dropdown or slide-out menu */}
            {/* Example: */}
            {/* <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} /> */}
          </div>
        </div>
      </motion.nav>

      <AuthModal
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </>
  );
}