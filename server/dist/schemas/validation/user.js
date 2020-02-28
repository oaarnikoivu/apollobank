"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object().keys({
    email: joi_1.default.string()
        .email()
        .required(),
    password: joi_1.default.string()
        .trim()
        .min(6)
        .required(),
    firstName: joi_1.default.string()
        .regex(/^[a-zA-Z]+$/)
        .required(),
    lastName: joi_1.default.string()
        .regex(/^[a-zA-Z]+$/)
        .required(),
    dateOfBirth: joi_1.default.date().required(),
    phone: joi_1.default.string()
        .trim()
        .regex(/^[0-9]{7,10}$/)
        .required(),
    streetAddress: joi_1.default.string()
        .trim()
        .regex(/^[a-z\d\s\-\.\,]*$/i)
        .max(100)
        .required(),
    postCode: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
});
exports.userLoginSchema = joi_1.default.object().keys({
    email: joi_1.default.string()
        .email()
        .required(),
    password: joi_1.default.string()
        .trim()
        .min(6)
        .required(),
});
//# sourceMappingURL=user.js.map