import { Document } from 'mongoose';
import { IUser } from './User';

export interface Account extends Document {
  owner: IUser;
  currency: string;
  balance: number;
}
