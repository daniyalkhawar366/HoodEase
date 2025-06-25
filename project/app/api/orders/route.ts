import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import mongoose from 'mongoose';

// Create a new order
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Map cart items to order items, using productId from frontend
    const orderItems = body.items.map((item: any) => ({
      ...item,
      productId: new mongoose.Types.ObjectId(item.productId),
    }));

    const newOrderData = {
      ...body,
      items: orderItems,
      userId: new mongoose.Types.ObjectId(body.userId),
    };

    const order = new Order(newOrderData);
    await order.save();

    // Update product stock after order is placed
    await Promise.all(orderItems.map(async (item: any) => {
      console.log('[Order API] Incoming productId:', item.productId);
      console.log('[Order API] Updating stock for productId:', item.productId.toString(), 'color:', item.selectedColor, 'size:', item.selectedSize, 'qty:', item.quantity, 'variantId:', item.variantId);
      // Always use fallback: load product, find variant, update, save
      const product = await Product.findById(item.productId);
      if (!product) {
        console.log('[Order API] Product not found for ID:', item.productId.toString());
        return;
      }
      let variant = null;
      if (item.variantId && product.stockByVariant.id) {
        // Try to find by ObjectId
        const variantObjectId = typeof item.variantId === 'string'
          ? new mongoose.Types.ObjectId(item.variantId)
          : item.variantId;
        variant = product.stockByVariant.id(variantObjectId);
      }
      if (!variant) {
        // Fallback to color/size
        const normColor = item.selectedColor?.trim().toLowerCase();
        const normSize = item.selectedSize?.trim().toLowerCase();
        variant = product.stockByVariant.find(
          (v: any) =>
            v.color.trim().toLowerCase() === normColor &&
            v.size.trim().toLowerCase() === normSize
        );
      }
      if (variant) {
        variant.quantity = Math.max(0, variant.quantity - item.quantity);
        try {
          await product.save();
          console.log('[Order API] Updated variant after save:', JSON.stringify(variant));
        } catch (err) {
          console.error('[Order API] Error saving product:', err);
        }
      } else {
        console.log('[Order API] No matching variant found for color:', item.selectedColor, 'size:', item.selectedSize, 'variantId:', item.variantId);
      }
    }));

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