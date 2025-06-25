"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../lib/db"));
const Product_1 = __importDefault(require("../models/Product"));
const User_1 = __importDefault(require("../models/User"));
const Order_1 = __importDefault(require("../models/Order"));
const Category_1 = __importDefault(require("../models/Category"));
const products_1 = require("../lib/products");
const products_women_1 = require("../lib/products-women");
const products_kids_1 = require("../lib/products-kids");
const categories = [
    { name: 'Men', slug: 'men', description: 'Men\'s clothing', isActive: true },
    { name: 'Women', slug: 'women', description: 'Women\'s clothing', isActive: true },
    { name: 'Kids', slug: 'kids', description: 'Kids\' clothing', isActive: true },
    // Add more categories/subcategories as needed
];
async function seedDatabase() {
    try {
        await (0, db_1.default)();
        console.log('Connected to database');
        // Clear existing products, users, orders, categories
        await Product_1.default.deleteMany({});
        // Keep admin user
        await User_1.default.deleteMany({ email: { $ne: 'Admin@Hoodease.com' } });
        await Order_1.default.deleteMany({});
        await Category_1.default.deleteMany({});
        console.log('Cleared existing products, non-admin users, orders, and categories');
        // Seed categories
        const insertedCategories = await Category_1.default.insertMany(categories);
        console.log(`Inserted ${insertedCategories.length} categories`);
        // Combine all products
        const allProducts = [
            ...products_1.products.map(p => ({ ...p, id: undefined })),
            ...products_women_1.productsWomen.map(p => ({ ...p, id: undefined })),
            ...products_kids_1.productsKids.map(p => ({ ...p, id: undefined }))
        ];
        // Insert products
        const insertedProducts = await Product_1.default.insertMany(allProducts);
        console.log(`Inserted ${insertedProducts.length} products`);
        // --- User Creation ---
        const usersToCreate = [
            { firstName: 'Ali', lastName: 'Khan', email: 'ali.khan@example.com', password: 'password123', address: '123 Main St, Lahore', dateOfBirth: '1990-05-15' },
            { firstName: 'Fatima', lastName: 'Ahmed', email: 'fatima.ahmed@example.com', password: 'password123', address: '456 Gulberg, Lahore', dateOfBirth: '1992-08-22' },
            { firstName: 'Zainab', lastName: 'Bibi', email: 'zainab.bibi@example.com', password: 'password123', address: '789 DHA Phase 5, Karachi', dateOfBirth: '1988-11-30' },
            { firstName: 'Bilal', lastName: 'Chaudhry', email: 'bilal.chaudhry@example.com', password: 'password123', address: '101 Johar Town, Lahore', dateOfBirth: '1995-02-10' },
            { firstName: 'Sana', lastName: 'Iqbal', email: 'sana.iqbal@example.com', password: 'password123', address: '212 Bahria Town, Rawalpindi', dateOfBirth: '1998-07-19' },
        ];
        for (const userData of usersToCreate) {
            const userExists = await User_1.default.findOne({ email: userData.email });
            if (!userExists) {
                const user = new User_1.default({ ...userData, dateOfBirth: new Date(userData.dateOfBirth) });
                await user.save();
            }
        }
        const createdUsers = await User_1.default.find({ isAdmin: { $ne: true } });
        console.log(`Created or found ${createdUsers.length} test users`);
        // --- Admin User ---
        const adminExists = await User_1.default.findOne({ email: 'Admin@Hoodease.com' });
        if (!adminExists) {
            const adminUser = new User_1.default({
                firstName: 'Admin',
                lastName: 'User',
                email: 'Admin@Hoodease.com',
                password: 'rootpass1',
                address: '1 Admin Lane, Cyber City',
                dateOfBirth: new Date('1990-01-01'),
                isAdmin: true
            });
            await adminUser.save();
            console.log('Created admin user');
        }
        // --- Order Generation ---
        const dbProducts = await Product_1.default.find();
        const dbUsers = await User_1.default.find({ isAdmin: { $ne: true } });
        const ordersToCreate = [];
        const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
        if (dbProducts.length > 0 && dbUsers.length > 0) {
            for (let i = 0; i < 20; i++) {
                const randomUser = dbUsers[Math.floor(Math.random() * dbUsers.length)];
                const numItems = Math.floor(Math.random() * 3) + 1;
                const items = [];
                let totalAmount = 0;
                for (let j = 0; j < numItems; j++) {
                    const randomProduct = dbProducts[Math.floor(Math.random() * dbProducts.length)];
                    const quantity = Math.floor(Math.random() * 2) + 1;
                    items.push({
                        productId: randomProduct._id,
                        name: randomProduct.name,
                        price: randomProduct.price,
                        quantity: quantity,
                        selectedColor: randomProduct.colors[0],
                        selectedSize: randomProduct.sizes[0],
                        image: randomProduct.image
                    });
                    totalAmount += randomProduct.price * quantity;
                }
                const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                const orderDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000); // within last 30 days
                ordersToCreate.push({
                    orderId: `ORD${(1001 + i).toString()}`,
                    userId: randomUser._id,
                    customerName: `${randomUser.firstName} ${randomUser.lastName}`,
                    items: items,
                    totalAmount: totalAmount,
                    status: randomStatus,
                    shippingAddress: {
                        street: randomUser.address,
                        city: 'City', // Placeholder
                        state: 'State', // Placeholder
                        zipCode: '12345', // Placeholder
                        country: 'Pakistan'
                    },
                    paymentMethod: 'COD',
                    paymentStatus: 'pending',
                    createdAt: orderDate,
                    updatedAt: orderDate,
                });
            }
            await Order_1.default.insertMany(ordersToCreate);
            console.log(`Inserted ${ordersToCreate.length} dummy orders`);
        }
        else {
            console.log("Could not create orders because there are no products or users in the database.");
        }
        console.log('Database seeding completed successfully');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
