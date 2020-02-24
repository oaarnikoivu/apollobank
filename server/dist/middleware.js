"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
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
//# sourceMappingURL=middleware.js.map