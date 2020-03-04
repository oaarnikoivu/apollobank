import { Request, Response, NextFunction } from 'express';
import { RequestCustom } from '../types/custom';
import { Account } from '../models/Account';

export const getAccounts = (_req: Request, res: Response) => {
  res.json({
    message: 'accounts',
  });
};

export const postAccounts = (req: RequestCustom, res: Response, next: NextFunction) => {
  new Account({
    owner: req.user?._id,
    currency: req.body.currency,
    balance: req.body.balance,
  })
    .save()
    .then(savedAccount => {
      res.json(savedAccount);
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
};
