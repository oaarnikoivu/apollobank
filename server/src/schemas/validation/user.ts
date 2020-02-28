import Joi from 'joi';

export const userSchema: Joi.ObjectSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .trim()
    .min(6)
    .required(),
  firstName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .required(),
  lastName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .required(),
  dateOfBirth: Joi.date().required(),
  phone: Joi.string()
    .trim()
    .regex(/^[0-9]{7,10}$/)
    .required(),
  streetAddress: Joi.string()
    .trim()
    .regex(/^[a-z\d\s\-\.\,]*$/i)
    .max(100)
    .required(),
  postCode: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

export const userLoginSchema: Joi.ObjectSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .trim()
    .min(6)
    .required(),
});
