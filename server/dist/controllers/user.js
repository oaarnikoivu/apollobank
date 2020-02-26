"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorTypes_1 = require("../errorTypes");
const user_1 = require("../schemas/validation/user");
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const joi_1 = __importDefault(require("joi"));
exports.postSignup = (req, res, next) => {
    let newUser = req.body;
    const result = joi_1.default.validate(newUser, user_1.userSchema);
    if (result.error === null) {
        User_1.User.findOne({
            email: newUser.email,
        }).then((user) => {
            if (user) {
                const error = new Error(errorTypes_1.ErrorTypes.EMAIL_EXISTS);
                next(error);
            }
            else {
                bcryptjs_1.default.hash(newUser.password, 12).then((hash) => {
                    new User_1.User({
                        email: newUser.email,
                        password: hash,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        dateOfBirth: newUser.dateOfBirth,
                        phone: newUser.phone,
                        streetAddress: newUser.streetAddress,
                        postCode: newUser.postCode,
                        city: newUser.city,
                        country: newUser.country,
                    })
                        .save()
                        .then(savedUser => res.json({ savedUser }));
                });
            }
        });
    }
    else {
        next(result.error);
    }
};
//# sourceMappingURL=user.js.map