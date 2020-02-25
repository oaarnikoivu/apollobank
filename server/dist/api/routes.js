"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = require("./auth/authRoutes");
exports.router = express_1.Router();
exports.router.get('/', (_req, res) => {
    res.json({
        message: 'Hello World!',
    });
});
exports.router.post('/signup', (_req, res) => {
    res.json({
        message: 'Signup route',
    });
});
exports.router.use('/api', authRoutes_1.authRouter);
//# sourceMappingURL=routes.js.map