import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    await dbConnect();
    const { token } = params;

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.redirect(new URL('/verification-failed?error=invalid_token', request.url));
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;
    await user.save();

    return NextResponse.redirect(new URL('/verification-success', request.url));
    
  } catch (error: any) {
    return NextResponse.redirect(new URL('/verification-failed?error=server_error', request.url));
  }
} 