"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../lib/db"));
const Product_1 = __importDefault(require("../models/Product"));
async function migrateStockByVariant() {
    await (0, db_1.default)();
    const products = await Product_1.default.find({});
    let updatedCount = 0;
    for (const product of products) {
        // Only migrate if not already migrated
        if (product.stockByVariant && product.stockByVariant.length > 0)
            continue;
        if (!product.colors || !product.sizes)
            continue;
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
