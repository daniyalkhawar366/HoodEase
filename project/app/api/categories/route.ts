import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';

// Create a new category
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const category = new Category(body);
    await category.save();
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

// List all categories
export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ sortOrder: 1, name: 1 });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
} 