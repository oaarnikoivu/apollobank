"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = require("../models/Account");
exports.getAccounts = (req, res, _next) => {
    var _a;
    Account_1.Account.find({ owner: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }).then(accounts => {
        res.json(accounts);
    });
};
exports.getAccount = (req, res, _next) => {
    var _a;
    Account_1.Account.findOne({ _id: req.params.id, owner: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }).then(account => {
        res.json(account);
    });
};
exports.postAccounts = (req, res, next) => {
    var _a;
    new Account_1.Account({
        owner: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        currency: req.body.currency,
        balance: req.body.balance,
    })
        .save()
        .then(savedAccount => {
        res.json(savedAccount);
    })
        .catch(error => {
        console.log(error);
        next(error);
    });
};
//# sourceMappingURL=account.js.map