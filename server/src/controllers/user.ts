import { ErrorTypes } from '../errorTypes';
import { userSchema } from '../schemas/validation/user';
import { Response, Request, NextFunction } from 'express';
import { User, IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

export const postSignup = (req: Request, res: Response, next: NextFunction) => {
  let newUser: IUser = req.body;
  const result: Joi.ValidationResult<any> = Joi.validate(newUser, userSchema);

  if (result.error === null) {
    User.findOne({
      email: newUser.email,
    }).then((user: IUser | null) => {
      if (user) {
        const error: Error = new Error(ErrorTypes.EMAIL_EXISTS);
        next(error);
      } else {
        bcrypt.hash(newUser.password, 12).then((hash: string) => {
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
            .then(savedUser => res.json({ savedUser }));
        });
      }
    });
  } else {
    next(result.error);
  }
};
