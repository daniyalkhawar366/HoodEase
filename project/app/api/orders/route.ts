import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

// Create a new order
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const order = new Order(body);
    await order.save();
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

// List all orders (optionally filter by userId)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');

    let query: any = {};
    if (userId) {
      query.userId = userId;
    }

    // Fix status filtering to handle case-insensitive matching
    if (type === 'active') {
      // Active orders: Processing, Shipped, Pending
      query.status = { 
        $in: ['Processing', 'Shipped', 'Pending', 'processing', 'shipped', 'pending'] 
      };
    } else if (type === 'past') {
      // Past orders: Delivered, Cancelled
      query.status = { 
        $in: ['Delivered', 'Cancelled', 'delivered', 'cancelled'] 
      };
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .populate('userId', 'firstName lastName email'); // Populate user details

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
} 