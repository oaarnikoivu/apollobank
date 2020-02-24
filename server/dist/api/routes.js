"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dummyData_1 = require("./dummyData");
exports.router = express_1.Router();
exports.router.get('/', (_req, res) => {
    res.json({
        message: 'Hello World!',
    });
});
exports.router.get('/accounts', (_req, res) => {
    res.send(dummyData_1.accounts);
});
exports.router.get('/analytics', (_req, res) => {
    res.json({
        message: 'Analytics Page',
    });
});
exports.router.get('/payments', (_req, res) => {
    res.json({
        message: 'Payments Page',
    });
});
exports.router.get('/cards', (_req, res) => {
    res.json({
        message: 'Cards Page',
    });
});
exports.router.get('/dashboard', (_req, res) => {
    res.json({
        message: 'Dashboard Page',
    });
});
//# sourceMappingURL=routes.js.map