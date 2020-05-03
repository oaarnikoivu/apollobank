"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const messages_1 = require("./../utils/messages");
const createRandom_1 = require("./../utils/createRandom");
const middleware_1 = require("../middleware");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entity/User");
const Account_1 = require("../entity/Account");
const createRandom_2 = require("../utils/createRandom");
const messages_2 = require("../utils/messages");
let AccountResponse = class AccountResponse {
};
__decorate([
    type_graphql_1.Field(() => Account_1.Account),
    __metadata("design:type", Account_1.Account)
], AccountResponse.prototype, "account", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], AccountResponse.prototype, "message", void 0);
AccountResponse = __decorate([
    type_graphql_1.ObjectType()
], AccountResponse);
let AccountResolver = class AccountResolver {
    accounts({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload) {
                return null;
            }
            const owner = yield User_1.User.findOne({ where: { id: payload.userId } });
            if (owner) {
                return Account_1.Account.find({ where: { owner: owner } });
            }
            return null;
        });
    }
    account(currency, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload) {
                throw new Error("");
            }
            const owner = yield User_1.User.findOne({ where: { id: payload.userId } });
            if (owner) {
                const account = Account_1.Account.findOne({ where: { owner: owner, currency: currency } });
                if (account) {
                    return account;
                }
            }
            return undefined;
        });
    }
    addMoney(amount, currency, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload) {
                return null;
            }
            const owner = yield User_1.User.findOne({ where: { id: payload.userId } });
            if (owner) {
                const account = yield Account_1.Account.findOne({
                    where: { owner: owner, currency: currency },
                });
                if (account) {
                    try {
                        yield Account_1.Account.update({ id: account.id }, { balance: account.balance + amount });
                    }
                    catch (err) {
                        throw new Error(messages_1.ErrorMessages.ADD_MONEY);
                    }
                }
            }
            try {
                const updatedAccount = yield Account_1.Account.findOne({
                    where: { owner: owner, currency: currency },
                });
                if (updatedAccount) {
                    return {
                        account: updatedAccount,
                        message: messages_2.SuccessMessages.ADD_MONEY,
                    };
                }
            }
            catch (error) {
                throw new Error(messages_1.ErrorMessages.ADD_MONEY);
            }
            return null;
        });
    }
    exchange(selectedAccountCurrency, toAccountCurrency, amount, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload) {
                return null;
            }
            const owner = yield User_1.User.findOne({ where: { id: payload.userId } });
            if (owner) {
                const currentAccount = yield Account_1.Account.findOne({
                    where: { owner: owner, currency: selectedAccountCurrency },
                });
                if (currentAccount) {
                    if (currentAccount.balance >= amount) {
                        const toAccount = yield Account_1.Account.findOne({
                            where: {
                                owner: owner,
                                currency: toAccountCurrency,
                            },
                        });
                        if (toAccount) {
                            try {
                                let amountWithConversion = 0;
                                if (selectedAccountCurrency === "EUR" && toAccountCurrency === "USD") {
                                    amountWithConversion = amount * 1.11;
                                }
                                else if (selectedAccountCurrency === "EUR" && toAccountCurrency === "GBP") {
                                    amountWithConversion = amount * 0.89;
                                }
                                else if (selectedAccountCurrency === "USD" && toAccountCurrency === "EUR") {
                                    amountWithConversion = amount * 0.9;
                                }
                                else if (selectedAccountCurrency === "USD" && toAccountCurrency === "GBP") {
                                    amountWithConversion = amount * 0.8;
                                }
                                else if (selectedAccountCurrency === "GBP" && toAccountCurrency === "USD") {
                                    amountWithConversion = amount * 1.25;
                                }
                                else if (selectedAccountCurrency === "GBP" && toAccountCurrency === "EUR") {
                                    amountWithConversion = amount * 1.13;
                                }
                                yield Account_1.Account.update({ id: toAccount.id }, { balance: toAccount.balance + Math.round(amountWithConversion) });
                                yield Account_1.Account.update({ id: currentAccount.id }, { balance: currentAccount.balance - Math.round(amountWithConversion) });
                            }
                            catch (err) {
                                console.log(err);
                                return null;
                            }
                        }
                    }
                    else {
                        throw new Error(messages_1.ErrorMessages.EXCHANGE);
                    }
                }
            }
            try {
                const updatedAccount = yield Account_1.Account.findOne({
                    where: { owner: owner, currency: selectedAccountCurrency },
                });
                if (updatedAccount) {
                    return {
                        account: updatedAccount,
                        message: messages_2.SuccessMessages.EXCHANGE,
                    };
                }
            }
            catch (error) {
                throw new Error(messages_1.ErrorMessages.EXCHANGE);
            }
            return null;
        });
    }
    createAccount(currency, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload) {
                return false;
            }
            const owner = yield User_1.User.findOne({ where: { id: payload.userId } });
            if (owner) {
                const account = yield Account_1.Account.findOne({
                    where: { owner: owner, currency: currency },
                });
                if (account) {
                    throw new Error(`You already have a ${currency} account`);
                }
                else {
                    try {
                        yield Account_1.Account.insert({
                            owner,
                            currency,
                            sortCode: currency === "GBP" ? createRandom_2.createRandomSortCode() : "00-00-00",
                            iban: createRandom_2.createRandomIbanCode(),
                            bic: createRandom_1.createRandomBicCode(),
                        });
                    }
                    catch (err) {
                        console.log(err);
                        return false;
                    }
                }
            }
            return true;
        });
    }
    deleteAccount(currency, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload) {
                return false;
            }
            const owner = yield User_1.User.findOne({ where: { id: payload.userId } });
            if (owner) {
                const account = yield Account_1.Account.findOne({
                    where: { owner: owner, currency: currency },
                });
                if (account) {
                    if (account.balance == 0) {
                        try {
                            yield Account_1.Account.delete({
                                id: account.id,
                            });
                        }
                        catch (error) {
                            console.log(error);
                            return false;
                        }
                    }
                    else if (account.balance < 0) {
                        throw new Error(messages_1.ErrorMessages.BALANCE_LESS_THAN);
                    }
                    else if (account.balance > 0) {
                        throw new Error(messages_1.ErrorMessages.BALANCE_GREATER_THAN);
                    }
                }
            }
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Account_1.Account]),
    type_graphql_1.UseMiddleware(middleware_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "accounts", null);
__decorate([
    type_graphql_1.Query(() => Account_1.Account),
    type_graphql_1.UseMiddleware(middleware_1.isAuth),
    __param(0, type_graphql_1.Arg("currency")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "account", null);
__decorate([
    type_graphql_1.Mutation(() => AccountResponse),
    type_graphql_1.UseMiddleware(middleware_1.isAuth),
    __param(0, type_graphql_1.Arg("amount")),
    __param(1, type_graphql_1.Arg("currency")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "addMoney", null);
__decorate([
    type_graphql_1.Mutation(() => AccountResponse),
    type_graphql_1.UseMiddleware(middleware_1.isAuth),
    __param(0, type_graphql_1.Arg("selectedAccountCurrency")),
    __param(1, type_graphql_1.Arg("toAccountCurrency")),
    __param(2, type_graphql_1.Arg("amount")),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "exchange", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(middleware_1.isAuth),
    __param(0, type_graphql_1.Arg("currency")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "createAccount", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(middleware_1.isAuth),
    __param(0, type_graphql_1.Arg("currency")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "deleteAccount", null);
AccountResolver = __decorate([
    type_graphql_1.Resolver()
], AccountResolver);
exports.AccountResolver = AccountResolver;
//# sourceMappingURL=AccountResolver.js.map