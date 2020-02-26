import { Request, Response } from 'express';

export const getCards = (_req: Request, res: Response) => {
  res.json({
    message: 'Cards',
  });
};
