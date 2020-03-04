import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface Account extends Document {
  owner: IUser;
  currency: string;
  balance: number;
}

const accountSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  currency: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

export const Account = mongoose.model('Account', accountSchema);
