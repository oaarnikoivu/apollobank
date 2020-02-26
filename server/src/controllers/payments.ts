import { Request, Response } from 'express';

export const getPayments = (_req: Request, res: Response) => {
  res.json({
    message: 'Payments page',
  });
};
