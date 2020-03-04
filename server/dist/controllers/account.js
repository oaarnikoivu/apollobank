"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = require("../models/Account");
exports.getAccounts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        try {
            let accounts = yield Account_1.Account.find({ owner: req.user._id }).lean();
            res.json(accounts);
        }
        catch (error) {
            next(error);
        }
    }
});
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