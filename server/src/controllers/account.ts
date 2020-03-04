import { Response, NextFunction } from 'express';
import { RequestCustom } from '../types/custom';
import { Account } from '../models/Account';

export const getAccounts = (req: RequestCustom, res: Response, _next: NextFunction) => {
  Account.find({ owner: req.user?._id }).then(accounts => {
    res.json(accounts);
  });
};

export const getAccount = (req: RequestCustom, res: Response, _next: NextFunction) => {
  Account.findOne({ _id: req.params.id, owner: req.user?._id }).then(account => {
    res.json(account);
  });
};

export const postAccounts = (req: RequestCustom, res: Response, next: NextFunction) => {
  Account.findOne({
    owner: req.user?._id,
    currency: req.body.currency,
  }).then(account => {
    if (account) {
      const error: Error = new Error(`You already have a ${req.body.currency} account.`);
      res.status(409).json({ message: error.message });
      next(error);
    } else {
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
    }
  });
};
