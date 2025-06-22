import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Missing verification token.' }, { status: 400 });
    }

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired verification token. Please request a new one.' }, { status: 400 });
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: 'Your account has been successfully verified.' }, { status: 200 });

  } catch (error: any) {
    console.error('--- EMAIL VERIFICATION ERROR ---', error);
    return NextResponse.json({ error: error.message || 'An internal server error occurred.' }, { status: 500 });
  }
} 