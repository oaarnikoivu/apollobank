import mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
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
  dateOfBirth: { type: Date, required: true },
  phone: requiredString,
  streetAddress: requiredString,
  postCode: requiredString,
  city: requiredString,
  country: requiredString,
});

export const User = mongoose.model('User', userSchema);
