import dbConnect from '../lib/db';

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    await dbConnect();
    console.log('✅ MongoDB connection successful!');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
}

testConnection(); 