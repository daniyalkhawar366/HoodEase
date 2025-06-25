import mongoose from 'mongoose';
import Product from '../models/Product';
// @ts-ignore
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function migrateStockByVariantIds() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const products = await Product.find({});
  let updatedCount = 0;

  for (const product of products) {
    let changed = false;
    if (Array.isArray(product.stockByVariant)) {
      for (const variant of product.stockByVariant) {
        if (!variant._id) {
          variant._id = new mongoose.Types.ObjectId();
          changed = true;
        }
      }
    }
    if (changed) {
      await product.save();
      updatedCount++;
      console.log(`Updated product ${product._id} with new variant _id fields.`);
    }
  }
  console.log(`Migration complete. Updated ${updatedCount} products.`);
  await mongoose.disconnect();
}

migrateStockByVariantIds().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
}); 