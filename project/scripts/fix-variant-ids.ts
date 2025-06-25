import mongoose from 'mongoose';
import Product from '../models/Product';
import dotenv from 'dotenv';
// @ts-ignore
dotenv.config({ path: '.env.local' });

async function fixVariantIds() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const products = await Product.find({});
  let updatedCount = 0;

  for (const product of products) {
    let changed = false;
    if (Array.isArray(product.stockByVariant)) {
      for (const variant of product.stockByVariant) {
        if (variant._id && typeof variant._id === 'string') {
          variant._id = new mongoose.Types.ObjectId(variant._id);
          changed = true;
        }
      }
    }
    if (changed) {
      await product.save();
      updatedCount++;
      console.log(`Fixed variant _id types for product ${product._id}`);
    }
  }
  console.log(`Type fix complete. Updated ${updatedCount} products.`);
  await mongoose.disconnect();
}

fixVariantIds().catch(err => {
  console.error('Type fix failed:', err);
  process.exit(1);
});