"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['men', 'women', 'kids']
    },
    subcategory: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    colors: [{
            type: String,
            trim: true
        }],
    sizes: [{
            type: String,
            trim: true
        }],
    description: {
        type: String,
        required: true,
        trim: true
    },
    images: [{
            type: String
        }],
    stockByVariant: [
        {
            color: { type: String, required: true },
            size: { type: String, required: true },
            quantity: { type: Number, required: true, min: 0 }
        }
    ],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
// Create indexes for better query performance
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ isActive: 1 });
exports.default = mongoose_1.default.models.Product || mongoose_1.default.model('Product', productSchema);
