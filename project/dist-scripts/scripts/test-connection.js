"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../lib/db"));
async function testConnection() {
    try {
        console.log('Testing MongoDB connection...');
        await (0, db_1.default)();
        console.log('✅ MongoDB connection successful!');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
}
testConnection();
