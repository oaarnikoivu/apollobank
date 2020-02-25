import { Router, Response, Request } from 'express';
import { authRouter } from './auth/authRoutes';
import Joi from 'joi';

export const router: Router = Router();

const schema: Joi.ObjectSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
  firstName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .required(),
  lastName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .required(),
  dateOfBirth: Joi.date().required(),
  phone: Joi.string()
    .trim()
    .regex(/^[0-9]{7,10}$/)
    .required(),
  streetAddress: Joi.string()
    .trim()
    .regex(/^[a-z\d\s\-\.\,]*$/i)
    .max(100)
    .required(),
  postCode: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World!',
  });
});

// routes which require authentication
router.post('/signup', (req: Request, res: Response) => {
  const result: Joi.ValidationResult<any> = Joi.validate(req.body, schema);
  res.json(result);
});

router.use('/api', authRouter);
