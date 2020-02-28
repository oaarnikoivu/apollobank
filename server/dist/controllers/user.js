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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var ValidationErrors;
(function (ValidationErrors) {
    ValidationErrors["LOGIN"] = "Unable to login.";
})(ValidationErrors || (ValidationErrors = {}));
const displayValidationError = (res, next, errorMessage, statusCode) => {
    const error = new Error(errorMessage);
    res.status(statusCode).json({ message: error.message });
    next(error);
};
exports.postSignup = (req, res, next) => {
    let newUser = req.body;
    const result = joi_1.default.validate(newUser, user_1.userSchema);
    if (result.error === null) {
        User_1.User.findOne({
            email: newUser.email,
        }).then((user) => {
            if (user) {
                const error = new Error(errorTypes_1.ErrorTypes.EMAIL_EXISTS);
                res.status(409).json({ message: error.message });
                next(error);
            }
            else {
                bcryptjs_1.default.hash(newUser.password.trim(), 12).then((hash) => {
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
                        .then(savedUser => res.json(savedUser));
                });
            }
        });
    }
    else {
        res.status(422);
        next(result.error);
    }
};
exports.postLogin = (req, res, next) => {
    const result = joi_1.default.validate(req.body, user_1.userLoginSchema);
    if (result.error === null) {
        User_1.User.findOne({
            email: req.body.email,
        }).then((user) => {
            if (user) {
                bcryptjs_1.default.compare(req.body.password, user.password).then((result) => {
                    if (result) {
                        const payload = {
                            _id: user._id,
                            email: user.email,
                        };
                        jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
                            expiresIn: '1d',
                        }, (error, token) => {
                            if (error) {
                                displayValidationError(res, next, ValidationErrors.LOGIN, 422);
                            }
                            else {
                                res.json({ token });
                            }
                        });
                    }
                    else {
                        displayValidationError(res, next, ValidationErrors.LOGIN, 422);
                    }
                });
            }
            else {
                displayValidationError(res, next, ValidationErrors.LOGIN, 422);
            }
        });
    }
    else {
        displayValidationError(res, next, ValidationErrors.LOGIN, 422);
    }
};
//# sourceMappingURL=user.js.map