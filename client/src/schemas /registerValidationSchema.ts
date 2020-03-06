import * as yup from 'yup';

export const registerValidationSchema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup
        .string()
        .email()
        .required('Email is required'),
    streetAddres: yup.string().required('Street address is required'),
    postCode: yup.string().required('Post code is required'),
    city: yup.string().required('City is required'),
    country: yup.string().required('Country is required'),
    password: yup.lazy(value =>
        !value
            ? yup.string()
            : yup
                  .string()
                  .min(6, 'Password must be at least 6 characters')
                  .required('Password is required'),
    ),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match'),
    dateOfBirth: yup.date().required('Date of birth is required'),
});
