import { Response } from 'express';
import { RequestCustom } from '../types/custom';

export const index = (req: RequestCustom, res: Response) => {
  res.json({
    message: 'Hello World!',
    user: req.user,
  });
};
