import { Router, Response, Request } from 'express';
import { Account, User } from './dummyData';

export const router: Router = Router();

const dummyUser: User = {
  id: '1',
  email: 'oliver.aarnikoivu@outlook.com',
  password: 'password',
  firstName: 'Oliver',
  lastName: 'Aarnikoivu',
  dateOfBirth: new Date(1996, 9, 29),
  phone: '+44 (0) 7599 469798',
  streetAddress: '45 An Der Merzel',
  postCode: '8350',
  city: 'Garnich',
  country: 'Luxembourg',
};

const dummyAccount01: Account = {
  owner: dummyUser,
  currency: 'EUR',
  balance: 7000,
};

const dummyAccount02: Account = {
  owner: dummyUser,
  currency: 'GBP',
  balance: 60,
};

const accounts: Account[] = [dummyAccount01, dummyAccount02];

router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World!',
  });
});

router.get('/accounts', (_req: Request, res: Response) => {
  res.send(accounts);
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
