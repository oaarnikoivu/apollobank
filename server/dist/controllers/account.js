"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccounts = (_req, res) => {
    res.json({
        message: 'accounts',
    });
};
exports.postAccounts = (req, _res, _next) => {
    console.log(req.user);
};
//# sourceMappingURL=account.js.map