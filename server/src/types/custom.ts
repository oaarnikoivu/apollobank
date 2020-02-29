import { Request } from 'express';

export interface RequestCustom extends Request {
  user?: string | object | undefined;
}
