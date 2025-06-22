import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    await dbConnect();
    const { token } = params;
    const { password } = await request.json();

    const user = await User.findOne({
      resetToken: token,
      tokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    user.password = password; // The pre-save hook will hash it
    user.resetToken = undefined;
    user.tokenExpiry = undefined;
    if (!user.isVerified) {
        user.isVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpiry = undefined;
    }
    await user.save();

    // Create JWT payload
    const jwtPayload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    
    // Sign the token
    const authToken = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    // Return user and token
    return NextResponse.json({ 
        message: 'Password reset successfully',
        user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        },
        token: authToken,
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('--- RESET PASSWORD ERROR ---', error);
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
} 