'use client';

import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmailPage({ params }: { params: { token: string } }) {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your email...');
  const { token } = params;
  const router = useRouter();
  const openAuthModal = useAuthStore((state) => state.openAuthModal);

  const verifyToken = useCallback(async () => {
    try {
      const res = await fetch(`/api/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed.');

      setStatus('success');
      setMessage(data.message || 'Email verified successfully!');
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'An unknown error occurred.');
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token, verifyToken]);

  const handleLoginClick = () => {
    router.push('/');
    setTimeout(() => {
      openAuthModal('login');
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center p-10 bg-white shadow-xl rounded-2xl">
        {status === 'verifying' && (
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <h1 className="text-xl font-medium text-gray-700">{message}</h1>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h1 className="text-2xl font-bold">Verification Successful</h1>
            <p className="text-gray-600">{message}</p>
            <Button onClick={handleLoginClick} className="mt-4">Login Now</Button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-4">
            <XCircle className="h-16 w-16 text-red-500" />
            <h1 className="text-2xl font-bold">Verification Failed</h1>
            <p className="text-gray-600">{message}</p>
            <Link href="/" passHref>
              <Button variant="outline" className="mt-4">Back to Home</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 