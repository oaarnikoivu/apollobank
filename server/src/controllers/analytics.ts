import { Request, Response } from 'express';

export const getAnalytics = (_req: Request, res: Response) => {
  res.json({
    message: 'Analytics page',
  });
};
