require('dotenv').config({ path: '.env.local' });
const dbConnect = require('../lib/db').default;
const Product = require('../models/Product').default;

async function migrateStockByVariant() {
  await dbConnect();
  const products = await Product.find({});
  let updatedCount = 0;

  for (const product of products) {
    if (product.stockByVariant && product.stockByVariant.length > 0) continue;
    if (!product.colors || !product.sizes) continue;
    const stockByVariant = [];
    for (const color of product.colors) {
      for (const size of product.sizes) {
        const quantity = Math.floor(Math.random() * 51);
        stockByVariant.push({ color, size, quantity });
      }
    }
    product.stockByVariant = stockByVariant;
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
