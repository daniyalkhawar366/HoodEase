import dbConnect from '../lib/db';
import Product from '../models/Product';

async function migrateStockByVariant() {
  await dbConnect();
  const products = await Product.find({});
  let updatedCount = 0;

  for (const product of products) {
    // Only migrate if not already migrated
    if (product.stockByVariant && product.stockByVariant.length > 0) continue;
    if (!product.colors || !product.sizes) continue;
    const stockByVariant = [];
    for (const color of product.colors) {
      for (const size of product.sizes) {
        // Assign random stock between 0 and 50
        const quantity = Math.floor(Math.random() * 51);
        stockByVariant.push({ color, size, quantity });
      }
    }
    product.stockByVariant = stockByVariant;
    // Remove old stock field if it exists
    if (typeof product.stock !== 'undefined') {
      product.stock = undefined;
    }
    await product.save();
    updatedCount++;
    console.log(`Migrated product ${product.name} (${product._id})`);
  }
  console.log(`Migration complete. Updated ${updatedCount} products.`);
  process.exit(0);
}

migrateStockByVariant().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
}); 