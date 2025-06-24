import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // product _id
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  selectedColor: { type: String, required: true },
  selectedSize: { type: String, required: true },
}, { _id: false });

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema],
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema); 