import { ErrorTypes } from './errorTypes';
import { userSchema } from './validationSchemas';
import { Router, Response, Request, NextFunction } from 'express';
import { authRouter } from './auth/authRoutes';
import { User, IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

export const router: Router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World!',
  });
});

// routes which require authentication
router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
  let newUser: IUser = req.body;
  const result: Joi.ValidationResult<any> = Joi.validate(newUser, userSchema);

  if (result.error === null) {
    // make sure email is unique
    User.findOne({
      email: newUser.email,
    }).then((user: IUser | null) => {
      if (user) {
        const error: Error = new Error(ErrorTypes.EMAIL_EXISTS);
        next(error);
      } else {
        // hash the command
        // insert the user with the hashed password
        bcrypt.hash(newUser.password, 12).then((hash: string) => {
          // insert the user into the db
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
});

router.use('/api', authRouter);
