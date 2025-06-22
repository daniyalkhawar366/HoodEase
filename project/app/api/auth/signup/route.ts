import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { sendEmail } from '@/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { firstName, lastName, email, password, address, dateOfBirth } = body;

    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      // If user exists but is not verified, resend verification email
      if (!existingUser.isVerified) {
        await sendEmail({ email, emailType: 'VERIFY', userId: existingUser._id });
        return NextResponse.json(
          { message: 'Confirmation email sent. Please verify your email.' },
          { status: 200 }
        );
      }
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      address,
      dateOfBirth: new Date(dateOfBirth)
    });

    const savedUser = await user.save();

    // Send verification email
    await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });

    return NextResponse.json({
      message: 'Confirmation email sent. Please check your inbox to verify your account.'
    }, { status: 201 });

  } catch (error) {
    console.error('--- SIGNUP API ERROR ---', error);
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
} 