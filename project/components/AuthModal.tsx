'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Eye, EyeOff, User, Mail, Lock, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

type AuthView = 'login' | 'signup' | 'forgot-password' | 'verification-sent';

export default function AuthModal({ onLogin, onSignup }: { onLogin: (email: string, password:string) => Promise<any>, onSignup: (data: any) => Promise<any> }) {
  const { isAuthModalOpen, authModalMode, closeAuthModal, setAuthModalMode } = useAuthStore();
  
  const [view, setView] = useState<AuthView>(authModalMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signupError, setSignupError] = useState<string | null>(null);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    setView(authModalMode);
    setSignupError(null);
  }, [authModalMode]);

  // Reset fields when view or modal visibility changes
  useEffect(() => {
    if (!isAuthModalOpen) {
      // Delay reset to allow for closing animation
      setTimeout(() => {
        setEmail('');
        setPassword('');
        setSignupData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          address: '',
          dateOfBirth: '',
        });
        setShowPassword(false);
        setLoading(false);
        setLoginError(null);
        setSignupError(null);
      }, 300);
    } else {
        // Reset fields when view changes
        setEmail('');
        setPassword('');
        setSignupError(null);
    }
  }, [view, isAuthModalOpen]);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed.');
      toast.success(data.message, { style: { color: 'black' } });
      setView('login');
    } catch (error: any) {
      toast.error(error.message, { style: { color: 'black' } });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(null);
    try {
      const result = await onLogin(email, password);
      if (result && result.error) {
         setLoginError(result.error);
         if (result.needsVerification) {
            toast.error(result.error, {
                action: {
                    label: "Resend Email",
                    onClick: () => handleResendVerification(email),
                },
                style: { color: 'black' }
            });
         }
      } else if (result && result.user) {
         setLoginError(null);
         closeAuthModal();
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSignupError(null);
    try {
      const result = await onSignup(signupData);
       if (result && result.error) {
         setSignupError(result.error);
       } else if (result && result.message) {
         setSignupError(null);
         setView('verification-sent');
       }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async (userEmail: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed.');
      toast.success(data.message, { style: { color: 'black' } });
    } catch (error: any) {
      toast.error(error.message, { style: { color: 'black' } });
    } finally {
      setLoading(false);
    }
  };

  const inputWithIconClasses = "flex items-center bg-gray-100 border border-gray-300 rounded-md";
  const iconClasses = "h-5 w-5 text-gray-400 ml-3";
  const inputClasses = "flex-1 bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none h-10 pr-3 text-black";

  const renderLogin = () => (
    <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <Label htmlFor="login-email">Email</Label>
          <div className={inputWithIconClasses}>
            <Mail className={iconClasses} />
            <Input id="login-email" type="email" placeholder="you@example.com" value={email} onChange={e => { setEmail(e.target.value); setLoginError(null); }} required className={inputClasses} autoComplete="new-password" />
          </div>
        </div>
        <div>
          <Label htmlFor="login-password">Password</Label>
          <div className={inputWithIconClasses}>
            <Lock className={iconClasses} />
            <Input id="login-password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => { setPassword(e.target.value); setLoginError(null); }} required className={inputClasses} autoComplete="new-password" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-2 text-muted-foreground mr-2">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        {loginError && (
          <div className="text-red-600 text-sm font-medium mt-1">{loginError}</div>
        )}
        <div className="text-right">
            <Button variant="link" size="sm" type="button" onClick={() => setView('forgot-password')} className="text-gray-600 hover:text-black">
                Forgot your password?
            </Button>
        </div>
        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </motion.div>
  );
  
  const renderSignup = () => (
    <motion.div key="signup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
      <form onSubmit={handleSignupSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <div className={inputWithIconClasses}>
              <User className={iconClasses} />
              <Input id="firstName" placeholder="John" value={signupData.firstName} onChange={e => setSignupData({...signupData, firstName: e.target.value})} required className={inputClasses} />
            </div>
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <div className={inputWithIconClasses}>
                <User className={iconClasses} />
                <Input id="lastName" placeholder="Doe" value={signupData.lastName} onChange={e => setSignupData({...signupData, lastName: e.target.value})} required className={inputClasses} />
            </div>
          </div>
        </div>
        <div>
            <Label htmlFor="signup-email">Email</Label>
            <div className={inputWithIconClasses}>
                <Mail className={iconClasses} />
                <Input id="signup-email" type="email" placeholder="you@example.com" value={signupData.email} onChange={e => setSignupData({...signupData, email: e.target.value})} required className={inputClasses} autoComplete="new-password" />
            </div>
        </div>
        <div>
            <Label htmlFor="signup-password">Password</Label>
            <div className={inputWithIconClasses}>
                <Lock className={iconClasses} />
                <Input id="signup-password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={signupData.password} onChange={e => setSignupData({...signupData, password: e.target.value})} required className={inputClasses} autoComplete="new-password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-2 text-muted-foreground mr-2">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
        <div>
            <Label htmlFor="address">Address</Label>
            <div className={inputWithIconClasses}>
                <MapPin className={iconClasses} />
                <Input id="address" placeholder="123 Cool St" value={signupData.address} onChange={e => setSignupData({...signupData, address: e.target.value})} required className={inputClasses} />
            </div>
        </div>
        <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <div className={inputWithIconClasses}>
                <Calendar className={iconClasses} />
                <Input id="dateOfBirth" type="date" value={signupData.dateOfBirth} onChange={e => setSignupData({...signupData, dateOfBirth: e.target.value})} required className={inputClasses} />
            </div>
        </div>
        {signupError && (
          <div className="text-red-600 text-sm font-medium mt-1">{signupError}</div>
        )}
        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
    </motion.div>
  );

  const renderForgotPassword = () => (
     <motion.div key="forgot-password" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Forgot Password?</h2>
        <p className="text-muted-foreground mt-2">No worries, we'll send you reset instructions.</p>
      </div>
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <div>
          <Label htmlFor="forgot-email">Email</Label>
          <div className={inputWithIconClasses}>
            <Mail className={iconClasses} />
            <Input id="forgot-email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required className={inputClasses} autoComplete="new-password" />
          </div>
        </div>
        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
       <Button variant="link" size="sm" className="w-full" onClick={() => setView('login')}>
            Back to Login
        </Button>
    </motion.div>
  );
  
  const renderVerificationSent = () => (
     <motion.div key="verification-sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4 py-8">
        <Mail className="mx-auto h-16 w-16 text-green-500 bg-green-500/10 p-3 rounded-full" />
        <h2 className="text-2xl font-semibold text-black">Check your email</h2>
        <p className="max-w-sm mx-auto text-black">We've sent a verification link to your email address. Please check your inbox (and spam folder) to complete your registration.</p>
        <Button onClick={closeAuthModal} className="w-full bg-black text-white hover:bg-gray-800 mt-4">
            OK, I'll check my email
        </Button>
    </motion.div>
  );

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeAuthModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-10 w-full max-w-md p-8 bg-white text-black rounded-xl border border-gray-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="ghost" size="icon" className="absolute top-3 right-3 text-gray-400 hover:text-black" onClick={closeAuthModal}><X/></Button>
            
            {view !== 'forgot-password' && view !== 'verification-sent' && (
              <div className="flex justify-center border-b border-gray-200 mb-6">
                <button onClick={() => setView('login')} className={`relative py-3 px-6 text-lg font-medium transition-colors ${view === 'login' ? 'text-black' : 'text-gray-500 hover:text-black'}`}>
                  Login
                  {view === 'login' && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" layoutId="underline" />}
                </button>
                <button onClick={() => setView('signup')} className={`relative py-3 px-6 text-lg font-medium transition-colors ${view === 'signup' ? 'text-black' : 'text-gray-500 hover:text-black'}`}>
                  Sign Up
                  {view === 'signup' && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" layoutId="underline" />}
                </button>
              </div>
            )}
            
            <AnimatePresence mode="wait">
              {view === 'login' && renderLogin()}
              {view === 'signup' && renderSignup()}
              {view === 'forgot-password' && renderForgotPassword()}
              {view === 'verification-sent' && renderVerificationSent()}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}