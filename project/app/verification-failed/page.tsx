'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function VerificationFailedPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    const [message, setMessage] = useState('An unexpected error occurred.');

    useEffect(() => {
        if (error === 'invalid_token') {
            setMessage('Verification failed. The link is invalid or has expired.');
        } else {
            setMessage('An unexpected server error occurred. Please try again later.');
        }
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md p-4">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        Verification Failed
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-gray-600 mb-6">{message}</p>
                    <Link href="/">
                        <Button variant="outline" className="w-full">
                            Back to Home
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
} 