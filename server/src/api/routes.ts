import { Router, Response, Request } from 'express';

export const router: Router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World!',
  });
});

router.get('/account', (_req: Request, res: Response) => {
  res.json({
    message: 'Account Page',
  });
});
