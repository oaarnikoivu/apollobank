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
const isAuth_1 = require("./../isAuth");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entity/User");
const Account_1 = require("../entity/Account");
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
    createAccount(currency, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload) {
                return false;
            }
            const owner = yield User_1.User.findOne({ where: { id: payload.userId } });
            if (owner) {
                const account = yield Account_1.Account.findOne({
                    where: { owner: owner, currency: currency }
                });
                if (account) {
                    throw new Error(`You already have a ${currency} account`);
                }
                else {
                    try {
                        yield Account_1.Account.insert({
                            owner,
                            currency
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
};
__decorate([
    type_graphql_1.Query(() => [Account_1.Account]),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "accounts", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("currency")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "createAccount", null);
AccountResolver = __decorate([
    type_graphql_1.Resolver()
], AccountResolver);
exports.AccountResolver = AccountResolver;
//# sourceMappingURL=AccountResolver.js.map