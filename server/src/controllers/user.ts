import { ErrorTypes } from '../errorTypes';
import { userSchema, userLoginSchema } from '../schemas/validation/user';
import { Response, Request, NextFunction } from 'express';
import { User, IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

export interface Payload extends Object {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

enum ValidationErrors {
  LOGIN = 'Unable to login.',
}

const displayValidationError = (res: Response, next: NextFunction, errorMessage: string, statusCode: number) => {
  const error: Error = new Error(errorMessage);
  res.status(statusCode).json({ message: error.message });
  next(error);
};

const signAndRespondWithToken = (user: IUser, res: Response, next: NextFunction) => {
  const payload: Payload = {
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  jwt.sign(
    payload,
    process.env.TOKEN_SECRET as string,
    {
      expiresIn: '1d', // make sure to change this to 1h for deployment
    },
    (error: Error, token: string) => {
      if (error) {
        displayValidationError(res, next, ValidationErrors.LOGIN, 422);
      } else {
        res.json({ token });
      }
    },
  );
};

export const postSignup = (req: Request, res: Response, next: NextFunction) => {
  let newUser: IUser = req.body;
  const result: Joi.ValidationResult<any> = Joi.validate(newUser, userSchema);

  if (result.error === null) {
    User.findOne({
      email: newUser.email,
    }).then((user: IUser | null) => {
      if (user) {
        const error: Error = new Error(ErrorTypes.EMAIL_EXISTS);
        res.status(409).json({ message: error.message });
        next(error);
      } else {
        bcrypt.hash(newUser.password.trim(), 12).then((hash: string) => {
          new User({
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
            .then(savedUser => {
              signAndRespondWithToken(savedUser, res, next);
            });
        });
      }
    });
  } else {
    res.status(422);
    next(result.error);
  }
};

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  const result: Joi.ValidationResult<any> = Joi.validate(req.body, userLoginSchema);

  if (result.error === null) {
    User.findOne({
      email: req.body.email,
    }).then((user: IUser | null) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then((result: boolean) => {
          if (result) {
            signAndRespondWithToken(user, res, next);
          } else {
            displayValidationError(res, next, ValidationErrors.LOGIN, 422);
          }
        });
      } else {
        displayValidationError(res, next, ValidationErrors.LOGIN, 422);
      }
    });
  } else {
    displayValidationError(res, next, ValidationErrors.LOGIN, 422);
  }
};
