require('dotenv').config({ path: '.env.local' });
const dbConnect = require('../lib/db').default;
const Product = require('../models/Product').default;

async function removeOldStockField() {
  await dbConnect();
  const result = await Product.updateMany(
    { stock: { $exists: true } },
    { $unset: { stock: "" } }
  );
  console.log(`Removed 'stock' field from ${result.modifiedCount || result.nModified || 0} products.`);
  process.exit(0);
}

removeOldStockField().catch(err => {
  console.error('Failed to remove old stock field:', err);
  process.exit(1);
}); 