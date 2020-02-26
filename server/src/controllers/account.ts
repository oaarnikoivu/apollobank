import { Request, Response } from 'express';
import { accounts } from '../dummyData';

export const getAccounts = (_req: Request, res: Response) => {
  res.send(accounts);
};
