"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const requiredString = {
    type: String,
    required: true,
};
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: requiredString,
    firstName: requiredString,
    lastName: requiredString,
    dateOfBirth: { type: Date, required: true },
    phone: requiredString,
    streetAddress: requiredString,
    postCode: requiredString,
    city: requiredString,
    country: requiredString,
});
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map