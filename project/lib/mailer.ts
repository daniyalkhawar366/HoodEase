import nodemailer from 'nodemailer';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

interface SendEmailOptions {
  email: string;
  emailType: 'VERIFY' | 'RESET';
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailOptions) => {
  try {
    // Generate a secure, random token
    const hashedToken = crypto.randomBytes(32).toString('hex');

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        resetToken: hashedToken,
        tokenExpiry: Date.now() + 3600000, // 1 hour
      });
    }

    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const verifyLink = `${process.env.NEXTAUTH_URL}/verify-email/${hashedToken}`;
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password/${hashedToken}`;
    const link = emailType === 'VERIFY' ? verifyLink : resetLink;

    const subject = emailType === 'VERIFY' ? 'Verify Your Email' : 'Reset Your Password';
    const body = `<p>Click <a href="${link}">here</a> to ${subject.toLowerCase()} or copy and paste the link below in your browser. <br> ${link}</p>`;

    const mailOptions = {
      from: `"HoodEase" <${process.env.EMAIL_SERVER_USER}>`,
      to: email,
      subject: subject,
      html: body,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error: any) {
    throw new Error(error.message);
  }
}; 