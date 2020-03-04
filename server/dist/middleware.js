"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorTypes_1 = require("./errorTypes");
exports.notFound = (req, res, next) => {
    res.status(404);
    const error = new Error(`Not Found - ${req.originalUrl}`);
    next(error);
};
exports.errorHandler = (error, _req, res) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
    });
};
exports.checkTokenSetUser = (req, _res, next) => {
    const authHeader = req.get('authorization');
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (error, user) => {
                if (error) {
                    console.log(error);
                }
                req.user = user;
                next();
            });
        }
        else {
            next();
        }
    }
    else {
        next();
    }
};
exports.isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        const error = new Error(errorTypes_1.ErrorTypes.UNAUTHORIZED);
        res.status(401);
        next(error);
    }
};
//# sourceMappingURL=middleware.js.map