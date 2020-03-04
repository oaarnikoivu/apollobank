import { Request } from 'express';
import { Payload } from '../controllers/user';

export interface RequestCustom extends Request {
  user?: Payload | undefined;
}
