'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Eye, EyeOff, User, Mail, Lock, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (userData: SignupData) => void;
  defaultMode?: 'login' | 'signup';
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  dateOfBirth: string;
}

export default function AuthModal({ isOpen, onClose, onLogin, onSignup, defaultMode = 'login' }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(defaultMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update mode when defaultMode prop changes
  useEffect(() => {
    setIsLogin(defaultMode === 'login');
  }, [defaultMode]);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupData, setSignupData] = useState<SignupData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    dateOfBirth: ''
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateDateOfBirth = (date: string) => {
    const selectedDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - selectedDate.getFullYear();
    return age >= 13 && age <= 120;
  };

  const validateSignupForm = () => {
    const newErrors: Record<string, string> = {};

    if (!signupData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (signupData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!signupData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (signupData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!signupData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(signupData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!signupData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(signupData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!signupData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (signupData.address.length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
    }

    if (!signupData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (!validateDateOfBirth(signupData.dateOfBirth)) {
      newErrors.dateOfBirth = 'You must be at least 13 years old';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (validateSignupForm()) {
      onSignup(signupData);
    }
  };

  const handleLogin = () => {
    if (!loginEmail.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    }
    if (!loginPassword) {
      setErrors({ password: 'Password is required' });
      return;
    }
    onLogin(loginEmail, loginPassword);
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setShowPassword(false);
  };

  const handleClose = () => {
    onClose();
    setIsLogin(defaultMode === 'login');
    setErrors({});
    setShowPassword(false);
    setLoginEmail('');
    setLoginPassword('');
    setSignupData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      dateOfBirth: ''
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-md"
        >
          <Card className="bg-white">
            <CardHeader className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 h-6 w-6"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
              <CardTitle className="text-center text-2xl font-bold">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Toggle Button */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={handleToggle}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                    isLogin 
                      ? 'bg-white text-black shadow-sm' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={handleToggle}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                    !isLogin 
                      ? 'bg-white text-black shadow-sm' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className={`pl-10 bg-white text-black/60 placeholder:text-black/40 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className={`pl-10 pr-10 bg-white text-black/60 placeholder:text-black/40 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500">{errors.password}</p>
                      )}
                    </div>

                    <Button 
                      onClick={handleLogin}
                      className="w-full bg-black hover:bg-gray-800 text-white"
                    >
                      Login
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="First name"
                            value={signupData.firstName}
                            onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                            className={`pl-10 bg-white text-black/60 placeholder:text-black/40 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                          />
                        </div>
                        {errors.firstName && (
                          <p className="text-sm text-red-500">{errors.firstName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Last name"
                            value={signupData.lastName}
                            onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                            className={`pl-10 bg-white text-black/60 placeholder:text-black/40 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                          />
                        </div>
                        {errors.lastName && (
                          <p className="text-sm text-red-500">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signupData.email}
                          onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                          className={`pl-10 bg-white text-black/60 placeholder:text-black/40 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a password"
                          value={signupData.password}
                          onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                          className={`pl-10 pr-10 bg-white text-black/60 placeholder:text-black/40 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500">{errors.password}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="address"
                          type="text"
                          placeholder="Enter your full address"
                          value={signupData.address}
                          onChange={(e) => setSignupData({...signupData, address: e.target.value})}
                          className={`pl-10 bg-white text-black/60 placeholder:text-black/40 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                        />
                      </div>
                      {errors.address && (
                        <p className="text-sm text-red-500">{errors.address}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={signupData.dateOfBirth}
                          onChange={(e) => setSignupData({...signupData, dateOfBirth: e.target.value})}
                          className={`pl-10 bg-white text-black/60 placeholder:text-black/40 ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                        />
                      </div>
                      {errors.dateOfBirth && (
                        <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
                      )}
                    </div>

                    <Button 
                      onClick={handleSignup}
                      className="w-full bg-black hover:bg-gray-800 text-white"
                    >
                      Create Account
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 