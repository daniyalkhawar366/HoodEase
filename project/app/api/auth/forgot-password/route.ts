import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { sendEmail } from '@/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'Email not found' }, { status: 404 });
    }

    // Send password reset email
    await sendEmail({ email, emailType: 'RESET', userId: user._id });

    return NextResponse.json({
      message: 'Password reset link sent. Please check your inbox.'
    }, { status: 200 });

  } catch (error) {
    console.error('--- FORGOT PASSWORD ERROR ---', error);
    return NextResponse.json({ error: 'Failed to send password reset email' }, { status: 500 });
  }
} 