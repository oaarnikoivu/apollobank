"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = (req, res) => {
    res.json({
        message: 'Hello World!',
        user: req.user,
    });
};
//# sourceMappingURL=home.js.map