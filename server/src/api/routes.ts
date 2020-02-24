import { Router, Response, Request } from 'express';

export const router: Router = Router();

interface Account {
  owner: string;
  currency: string;
  balance: number;
}

router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World!',
  });
});

router.get('/accounts', (_req: Request, res: Response) => {
  const myDummyAccount: Account = {
    owner: 'Oliver',
    currency: 'EUR',
    balance: 7000,
  };
  res.send(myDummyAccount);
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
