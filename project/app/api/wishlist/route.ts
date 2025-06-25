import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Wishlist from '@/models/Wishlist';
import Product from '@/models/Product';

// GET: Get all wishlist items for the user (userId as query param)
export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const wishlist: any = await Wishlist.findOne({ userId }).lean();
  if (!wishlist || !Array.isArray(wishlist.items) || !wishlist.items.length) {
    return NextResponse.json({ items: [] });
  }
  // Populate product details for each item
  const productIds = wishlist.items.map((item: any) => item.productId);
  const products = await Product.find({ _id: { $in: productIds } }).lean();
  const items = wishlist.items.map((item: any) => {
    const product = products.find((p: any) => String(p._id) === String(item.productId));
    return product ? {
      ...item,
      product: {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        images: product.images,
        category: product.category,
        subcategory: product.subcategory,
        slug: product.slug,
        colors: product.colors,
        sizes: product.sizes,
        description: product.description,
        rating: product.rating,
        numReviews: product.numReviews,
        isFeatured: product.isFeatured,
      }
    } : item;
  });
  return NextResponse.json({ items });
}

// POST: Add an item to the wishlist (userId in body)
export async function POST(req: NextRequest) {
  await dbConnect();
  const { userId, productId, selectedColor, selectedSize } = await req.json();
  if (!userId || !productId || !selectedColor || !selectedSize) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  // Ensure product exists
  const product = await Product.findById(productId);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  // Upsert wishlist and add item if not already present
  let wishlist: any = await Wishlist.findOne({ userId });
  if (!wishlist) {
    wishlist = new Wishlist({ userId, items: [] });
  }
  const exists = wishlist.items.some((item: any) =>
    String(item.productId) === String(productId) &&
    item.selectedColor === selectedColor &&
    item.selectedSize === selectedSize
  );
  if (exists) {
    return NextResponse.json({ error: 'Item already in wishlist' }, { status: 409 });
  }
  wishlist.items.push({ productId, selectedColor, selectedSize });
  wishlist.updatedAt = new Date();
  await wishlist.save();
  return NextResponse.json({ success: true });
}

// DELETE: Remove an item from the wishlist (userId in body)
export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { userId, productId, selectedColor, selectedSize } = await req.json();
  if (!userId || !productId || !selectedColor || !selectedSize) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const wishlist: any = await Wishlist.findOne({ userId });
  if (!wishlist) {
    return NextResponse.json({ error: 'Wishlist not found' }, { status: 404 });
  }
  wishlist.items = wishlist.items.filter((item: any) =>
    !(String(item.productId) === String(productId) &&
      item.selectedColor === selectedColor &&
      item.selectedSize === selectedSize)
  );
  wishlist.updatedAt = new Date();
  await wishlist.save();
  return NextResponse.json({ success: true });
} 