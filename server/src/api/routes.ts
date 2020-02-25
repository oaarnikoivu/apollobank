import { Router, Response, Request } from 'express';
import { authRouter } from './auth/authRoutes';

export const router: Router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World!',
  });
});

router.post('/signup', (_req: Request, res: Response) => {
  res.json({
    message: 'Signup route',
  });
});

// routes which require authentication
router.use('/api', authRouter);
