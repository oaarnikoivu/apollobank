"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dummyData_1 = require("../dummyData");
exports.authRouter = express_1.Router();
exports.authRouter.get('/accounts', (_req, res) => {
    res.send(dummyData_1.accounts);
});
exports.authRouter.get('/analytics', (_req, res) => {
    res.json({
        message: 'Analytics Page',
    });
});
exports.authRouter.get('/payments', (_req, res) => {
    res.json({
        message: 'Payments Page',
    });
});
exports.authRouter.get('/cards', (_req, res) => {
    res.json({
        message: 'Cards Page',
    });
});
exports.authRouter.get('/dashboard', (_req, res) => {
    res.json({
        message: 'Dashboard Page',
    });
});
//# sourceMappingURL=authRoutes.js.map