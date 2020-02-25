import mongoose from 'mongoose';

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
