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

    if (user.isVerified) {
      return NextResponse.json({ message: 'This account is already verified.' }, { status: 200 });
    }

    // Resend verification email
    await sendEmail({ email, emailType: 'VERIFY', userId: user._id });

    return NextResponse.json({
      message: 'Verification email sent. Please check your inbox.'
    }, { status: 200 });

  } catch (error) {
    console.error('--- RESEND VERIFICATION ERROR ---', error);
    return NextResponse.json({ error: 'Failed to resend verification email' }, { status: 500 });
  }
} 