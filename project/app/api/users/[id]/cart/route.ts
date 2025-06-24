import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Cart from '@/models/Cart';

// Get the user's cart
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;
    const cart = await Cart.findOne({ userId: id });
    if (!cart) {
      return NextResponse.json({ items: [] });
    }
    return NextResponse.json({ items: cart.items });
  } catch (error) {
    console.error(`Error fetching cart for user ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

// Update (or create) the user's cart
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;
    const { items } = await request.json();
    const cart = await Cart.findOneAndUpdate(
      { userId: id },
      { items, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    return NextResponse.json({ items: cart.items });
  } catch (error) {
    console.error(`Error updating cart for user ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
} 