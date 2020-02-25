import { Router, Response, Request } from 'express';
import { accounts } from '../dummyData';

export const authRouter: Router = Router();

authRouter.get('/accounts', (_req: Request, res: Response) => {
  res.send(accounts);
});

authRouter.get('/analytics', (_req: Request, res: Response) => {
  res.json({
    message: 'Analytics Page',
  });
});

authRouter.get('/payments', (_req: Request, res: Response) => {
  res.json({
    message: 'Payments Page',
  });
});

authRouter.get('/cards', (_req: Request, res: Response) => {
  res.json({
    message: 'Cards Page',
  });
});

authRouter.get('/dashboard', (_req: Request, res: Response) => {
  res.json({
    message: 'Dashboard Page',
  });
});
