import { Request, Response } from 'express';

export const getAccounts = (_req: Request, res: Response) => {
  res.json({
    message: 'accounts',
  });
};
