import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { email, password } = body;

    // Check for admin credentials
    if (email === 'Admin@Hoodease.com' && password === 'rootpass1') {
      return NextResponse.json({
        user: {
          firstName: 'Admin',
          lastName: 'User',
          email: 'Admin@Hoodease.com',
          address: 'Admin Address',
          dateOfBirth: '1990-01-01'
        },
        isAuthenticated: true,
        isAdmin: true
      });
    }

    // Find user by email (case-insensitive)
    const user = await User.findOne({ email: email.toLowerCase(), isActive: true });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 401 }
      );
    }

    // Check if user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: 'Please verify your email to login.', needsVerification: true },
        { status: 403 }
      );
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json({
      user: userWithoutPassword,
      isAuthenticated: true,
      isAdmin: user.isAdmin
    });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
} 