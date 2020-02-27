import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  streetAddress: string;
  postCode: string;
  city: string;
  country: string;
}

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: requiredString,
  firstName: requiredString,
  lastName: requiredString,
  dateOfBirth: requiredString,
  phone: requiredString,
  streetAddress: requiredString,
  postCode: requiredString,
  city: requiredString,
  country: requiredString,
});

export const User = mongoose.model<IUser>('User', userSchema);
