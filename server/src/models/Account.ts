import { User } from '../User/user_interfaces';
import { Document } from 'mongoose';

export interface Account extends Document {
  owner: User;
  currency: string;
  balance: number;
}
