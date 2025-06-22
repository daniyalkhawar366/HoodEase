# MongoDB Database Setup for HoodEase

## Overview
This guide will help you set up MongoDB for your HoodEase e-commerce project. MongoDB is an excellent choice for this project due to its flexible schema and excellent support for e-commerce data structures.

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)

## Database Collections

The following collections have been created for your HoodEase project:

### 1. **Products Collection**
- **Purpose**: Store all product information
- **Fields**:
  - `name`: Product name
  - `price`: Product price
  - `image`: Main product image
  - `category`: Product category (men/women/kids)
  - `subcategory`: Product subcategory
  - `slug`: URL-friendly product identifier
  - `colors`: Available colors array
  - `sizes`: Available sizes array
  - `description`: Product description
  - `images`: Additional product images
  - `stock`: Inventory quantity
  - `isActive`: Product availability status
  - `createdAt/updatedAt`: Timestamps

### 2. **Users Collection**
- **Purpose**: Store user accounts and authentication data
- **Fields**:
  - `firstName/lastName`: User's full name
  - `email`: Unique email address
  - `password`: Hashed password
  - `address`: User's address
  - `dateOfBirth`: User's birth date
  - `isAdmin`: Admin privileges flag
  - `isActive`: Account status
  - `phone`: Contact number (optional)
  - `avatar`: Profile picture (optional)
  - `createdAt/updatedAt`: Timestamps

### 3. **Orders Collection**
- **Purpose**: Store customer orders and transaction data
- **Fields**:
  - `userId`: Reference to user
  - `items`: Array of ordered products
  - `totalAmount`: Order total
  - `status`: Order status (pending/processing/shipped/delivered/cancelled)
  - `shippingAddress`: Delivery address
  - `paymentMethod`: Payment method used
  - `paymentStatus`: Payment status
  - `trackingNumber`: Shipping tracking
  - `notes`: Order notes
  - `createdAt/updatedAt`: Timestamps

### 4. **Categories Collection**
- **Purpose**: Organize products into categories
- **Fields**:
  - `name`: Category name
  - `slug`: URL-friendly identifier
  - `description`: Category description
  - `image`: Category image
  - `parentCategory`: Parent category reference
  - `isActive`: Category status
  - `sortOrder`: Display order
  - `createdAt/updatedAt`: Timestamps

## Setup Instructions

### Step 1: Install Dependencies
```bash
npm install mongodb mongoose bcryptjs @types/bcryptjs tsx
```

### Step 2: Set Up MongoDB

#### Option A: Local MongoDB
1. Download and install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Create a database named `hoodease`

#### Option B: MongoDB Atlas (Cloud)
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string

### Step 3: Environment Configuration
1. Copy `env.example` to `.env.local`
2. Update the MongoDB connection string:
   ```env
   # For local MongoDB
   MONGODB_URI=mongodb://localhost:27017/hoodease
   
   # For MongoDB Atlas
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hoodease?retryWrites=true&w=majority
   ```

### Step 4: Seed the Database
```bash
npm run seed
```
This will populate your database with all existing products and create an admin user.

### Step 5: Test the Setup
1. Start your development server:
   ```bash
   npm run dev
   ```
2. Visit `http://localhost:3000/api/products` to test the API
3. Try logging in with admin credentials:
   - Email: `Admin@Hoodease.com`
   - Password: `rootpass1`

## API Endpoints

### Products
- `GET /api/products` - Get all products (with optional filters)
- `GET /api/products/[slug]` - Get product by slug
- `POST /api/products` - Create new product
- `PUT /api/products/[slug]` - Update product
- `DELETE /api/products/[slug]` - Delete product

### Authentication
- `POST /api/auth` - User login
- `POST /api/auth/signup` - User registration

## Database Indexes

The following indexes have been created for optimal performance:

### Products
- `{ category: 1, subcategory: 1 }` - Category filtering
- `{ slug: 1 }` - Slug lookups
- `{ isActive: 1 }` - Active product filtering

### Users
- `{ email: 1 }` - Email lookups
- `{ isActive: 1 }` - Active user filtering

### Orders
- `{ userId: 1 }` - User order history
- `{ status: 1 }` - Order status filtering
- `{ createdAt: -1 }` - Recent orders
- `{ paymentStatus: 1 }` - Payment status filtering

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt
2. **Input Validation**: Mongoose schemas validate all input data
3. **SQL Injection Protection**: MongoDB is NoSQL, preventing SQL injection
4. **Data Sanitization**: All user inputs are trimmed and validated

## Migration from Static Data

The existing static product data in `lib/products.ts`, `lib/products-women.ts`, and `lib/products-kids.ts` has been preserved. The seeding script will migrate this data to the database while maintaining the same structure.

## Next Steps

1. **Update Components**: Modify your components to use the new API endpoints instead of static data
2. **Add Error Handling**: Implement proper error handling for database operations
3. **Add Caching**: Consider adding Redis for caching frequently accessed data
4. **Add Search**: Implement full-text search using MongoDB Atlas Search
5. **Add Analytics**: Track user behavior and sales analytics

## Troubleshooting

### Common Issues

1. **Connection Failed**: Check your MongoDB URI and ensure MongoDB is running
2. **Authentication Error**: Verify your MongoDB credentials
3. **Port Already in Use**: Change the MongoDB port or stop conflicting services
4. **Memory Issues**: Increase Node.js memory limit with `--max-old-space-size=4096`

### Getting Help

- Check MongoDB logs for detailed error messages
- Verify your environment variables are correctly set
- Ensure all dependencies are installed
- Test the connection with a simple script

## Performance Tips

1. **Use Indexes**: The schemas include optimized indexes for common queries
2. **Pagination**: API endpoints support pagination for large datasets
3. **Projection**: Only fetch required fields to reduce data transfer
4. **Connection Pooling**: Mongoose handles connection pooling automatically
5. **Caching**: Consider implementing Redis for frequently accessed data

Your HoodEase project is now ready with a robust MongoDB backend! 