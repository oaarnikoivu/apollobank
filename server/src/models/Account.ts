import { Document } from 'mongoose';
import { User } from './User';

export interface Account extends Document {
  owner: User;
  currency: string;
  balance: number;
}
