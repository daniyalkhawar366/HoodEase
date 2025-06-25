"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Product_1 = require("../models/Product");
// @ts-ignore
var dotenv_1 = require("dotenv");
dotenv_1.default.config({ path: '.env.local' });
function migrateStockByVariantIds() {
    return __awaiter(this, void 0, void 0, function () {
        var products, updatedCount, _i, products_1, product, changed, _a, _b, variant;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.connect(process.env.MONGODB_URI)];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, Product_1.default.find({})];
                case 2:
                    products = _c.sent();
                    updatedCount = 0;
                    _i = 0, products_1 = products;
                    _c.label = 3;
                case 3:
                    if (!(_i < products_1.length)) return [3 /*break*/, 6];
                    product = products_1[_i];
                    changed = false;
                    if (Array.isArray(product.stockByVariant)) {
                        for (_a = 0, _b = product.stockByVariant; _a < _b.length; _a++) {
                            variant = _b[_a];
                            if (!variant._id) {
                                variant._id = new mongoose_1.default.Types.ObjectId();
                                changed = true;
                            }
                        }
                    }
                    if (!changed) return [3 /*break*/, 5];
                    return [4 /*yield*/, product.save()];
                case 4:
                    _c.sent();
                    updatedCount++;
                    console.log("Updated product ".concat(product._id, " with new variant _id fields."));
                    _c.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log("Migration complete. Updated ".concat(updatedCount, " products."));
                    return [4 /*yield*/, mongoose_1.default.disconnect()];
                case 7:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
migrateStockByVariantIds().catch(function (err) {
    console.error('Migration failed:', err);
    process.exit(1);
});
