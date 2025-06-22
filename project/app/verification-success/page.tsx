'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function VerificationResultPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    const [message, setMessage] = useState('Verifying your email...');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (error) {
            setIsSuccess(false);
            if (error === 'invalid_token') {
                setMessage('Verification failed. The link is invalid or has expired.');
            } else {
                setMessage('An unexpected error occurred. Please try again later.');
            }
        } else {
            setIsSuccess(true);
            setMessage('Email verified successfully! You can now log in.');
        }
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md p-4">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        {isSuccess ? 'Verification Successful' : 'Verification Failed'}
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-gray-600 mb-6">{message}</p>
                    {isSuccess ? (
                        <Button onClick={() => router.push('/')} className="w-full">
                            Go to Login
                        </Button>
                    ) : (
                        <Link href="/">
                            <Button variant="outline" className="w-full">
                                Back to Home
                            </Button>
                        </Link>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 