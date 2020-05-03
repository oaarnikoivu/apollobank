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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Transaction_1 = require("./Transaction");
let Account = class Account extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Account.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (owner) => owner.accounts, { onDelete: "CASCADE" }),
    __metadata("design:type", User_1.User)
], Account.prototype, "owner", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: "00-00-00", nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "sortCode", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "iban", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "bic", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Account.prototype, "currency", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 1000 }),
    __metadata("design:type", Number)
], Account.prototype, "balance", void 0);
__decorate([
    typeorm_1.OneToMany(() => Transaction_1.Transaction, (transaction) => transaction.account, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Account.prototype, "transactions", void 0);
Account = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity("accounts")
], Account);
exports.Account = Account;
//# sourceMappingURL=Account.js.map