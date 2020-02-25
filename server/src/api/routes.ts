import { userSchema } from './schemas';
import { Router, Response, Request } from 'express';
import { authRouter } from './auth/authRoutes';
import Joi from 'joi';

export const router: Router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World!',
  });
});

// routes which require authentication
router.post('/signup', (req: Request, res: Response) => {
  const result: Joi.ValidationResult<any> = Joi.validate(req.body, userSchema);
  res.json(result);
});

router.use('/api', authRouter);
