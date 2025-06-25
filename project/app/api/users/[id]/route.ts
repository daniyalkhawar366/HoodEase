import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  const data = await req.json();

  // Only allow updating these fields
  const allowedFields = ['firstName', 'lastName', 'address', 'dateOfBirth', 'phone', 'avatar'];
  const update: any = {};
  for (const key of allowedFields) {
    if (data[key] !== undefined) update[key] = data[key];
  }
  update.updatedAt = new Date();

  try {
    const user = await User.findByIdAndUpdate(id, update, { new: true }).select('-password');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
} 