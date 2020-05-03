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
const validation_1 = require("./../utils/validation");
const auth_1 = require("../utils/auth");
const type_graphql_1 = require("type-graphql");
const bcryptjs_1 = require("bcryptjs");
const User_1 = require("../entity/User");
const middleware_1 = require("../middleware");
const sendRefreshToken_1 = require("../utils/sendRefreshToken");
const messages_1 = require("../utils/messages");
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
let LoginResponse = class LoginResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    __metadata("design:type", User_1.User)
], LoginResponse.prototype, "user", void 0);
LoginResponse = __decorate([
    type_graphql_1.ObjectType()
], LoginResponse);
let UserResolver = class UserResolver {
    me(context) {
        const authorization = context.req.headers["authorization"];
        if (!authorization) {
            return null;
        }
        try {
            const token = authorization.split(" ")[1];
            const payload = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
            context.payload = payload;
            return User_1.User.findOne(payload.userId);
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
    logout({ res }) {
        return __awaiter(this, void 0, void 0, function* () {
            sendRefreshToken_1.sendRefreshToken(res, "");
            return true;
        });
    }
    revokeRefreshTokensForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_1.getConnection().getRepository(User_1.User).increment({ id: userId }, "tokenVersion", 1);
            return true;
        });
    }
    login(email, password, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield validation_1.loginSchema.validateAsync({ email: email, password: password });
            }
            catch (error) {
                throw new Error("Something went wrong.");
            }
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                throw new Error(messages_1.ErrorMessages.LOGIN);
            }
            const valid = yield bcryptjs_1.compare(password, user.password);
            if (!valid) {
                throw new Error(messages_1.ErrorMessages.PASSWORD);
            }
            sendRefreshToken_1.sendRefreshToken(res, auth_1.createRefreshToken(user));
            return {
                accessToken: auth_1.createAccessToken(user),
                user,
            };
        });
    }
    register(email, password, firstName, lastName, dateOfBirth, streetAddress, postCode, city, country) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield validation_1.registerSchema.validateAsync({
                    email: email,
                    password: password,
                    dateOfBirth: dateOfBirth,
                });
            }
            catch (error) {
                console.log(error);
                return false;
            }
            const hashedPassword = yield bcryptjs_1.hash(password, 12);
            try {
                yield User_1.User.insert({
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    dateOfBirth,
                    streetAddress,
                    postCode,
                    city,
                    country,
                });
            }
            catch (err) {
                console.log(err);
                return false;
            }
            return true;
        });
    }
    updatePassword(oldPassword, newPassword, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload) {
                return false;
            }
            try {
                yield validation_1.changePasswordSchema.validateAsync({
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                });
            }
            catch (error) {
                console.log(error);
                return false;
            }
            const owner = yield User_1.User.findOne({ where: { id: payload.userId } });
            if (owner) {
                const valid = yield bcryptjs_1.compare(oldPassword, owner.password);
                if (valid) {
                    const updatedPassword = yield bcryptjs_1.hash(newPassword, 12);
                    try {
                        yield User_1.User.update({
                            id: owner.id,
                        }, {
                            password: updatedPassword,
                        });
                    }
                    catch (err) {
                        console.log(err);
                        return false;
                    }
                }
                else {
                    throw new Error(messages_1.ErrorMessages.UPDATE_PASSWORD);
                }
            }
            return true;
        });
    }
    destroyAccount({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload) {
                return false;
            }
            const owner = yield User_1.User.findOne({ where: { id: payload.userId } });
            if (owner) {
                try {
                    yield User_1.User.delete({
                        id: owner.id,
                    });
                }
                catch (error) {
                    throw new Error(messages_1.ErrorMessages.DELETE_ACCOUNT);
                }
            }
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("userId", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "revokeRefreshTokensForUser", null);
__decorate([
    type_graphql_1.Mutation(() => LoginResponse),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.Arg("firsName")),
    __param(3, type_graphql_1.Arg("lastName")),
    __param(4, type_graphql_1.Arg("dateOfBirth")),
    __param(5, type_graphql_1.Arg("streetAddress")),
    __param(6, type_graphql_1.Arg("postCode")),
    __param(7, type_graphql_1.Arg("city")),
    __param(8, type_graphql_1.Arg("country")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(middleware_1.isAuth),
    __param(0, type_graphql_1.Arg("oldPassword")),
    __param(1, type_graphql_1.Arg("newPassword")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updatePassword", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(middleware_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "destroyAccount", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map