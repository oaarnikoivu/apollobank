import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RequestCustom } from './types/custom';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error: Error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (error: Error, _req: Request, res: Response) => {
  const statusCode: number = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  });
};

export const checkTokenSetUser = (req: RequestCustom, _res: Response, next: NextFunction) => {
  const authHeader: string | undefined = req.get('authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET as string, (error: Error, user) => {
        if (error) {
          console.log(error);
        }
        req.user = user;
        console.log(req.user);
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
