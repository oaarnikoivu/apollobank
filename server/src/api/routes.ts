import { Router, Response, Request } from 'express';

export const router: Router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World!',
  });
});

router.get('/accounts', (_req: Request, res: Response) => {
  res.json({
    message: 'Accounts Page',
  });
});

router.get('/analytics', (_req: Request, res: Response) => {
  res.json({
    message: 'Analytics Page',
  });
});

router.get('/payments', (_req: Request, res: Response) => {
  res.json({
    message: 'Payments Page',
  });
});

router.get('/cards', (_req: Request, res: Response) => {
  res.json({
    message: 'Cards Page',
  });
});

router.get('/dashboard', (_req: Request, res: Response) => {
  res.json({
    message: 'Dashboard Page',
  });
});
