import React, { useState } from 'react';
import { Formik, Form, FieldAttributes, useField } from 'formik';
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { TextField, Button, makeStyles, ThemeProvider, CssBaseline } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { theme } from '../theme';
import { registerValidationSchema } from '../schemas /registerValidationSchema';

const useStyles = makeStyles({
    headerText: {
        textAlign: 'center',
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '420px',
        margin: '0 auto',
    },
    alignedFormContent: {
        marginTop: 12,
        display: 'flex',
        width: '100%',
    },
    alignedFormField: {
        width: '50%',
        marginRight: 8,
    },
    formField: {
        width: '411px',
        marginRight: 8,
        marginTop: 12,
    },
    formButton: {
        marginTop: 12,
        textAlign: 'center',
    },
    loginText: {
        margintop: 12,
    },
});

const FormTextField: React.FC<FieldAttributes<{}>> = ({
    placeholder,
    className,
    type,
    ...props
}) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TextField
                className={className}
                type={type}
                variant="standard"
                required={true}
                placeholder={placeholder}
                {...field}
                helperText={errorText}
                error={!!errorText}
            />
        </ThemeProvider>
    );
};

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [register] = useRegisterMutation();
    const [alertMessage, setAlertMessage] = useState('');
    const classes = useStyles();

    const renderAlertMessage = () => {
        return (
            <Alert variant="outlined" severity="error">
                {alertMessage}
            </Alert>
        );
    };

    return (
        <div>
            <div>
                <h1 className={classes.headerText}>Sign Up</h1>
            </div>
            {alertMessage.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {renderAlertMessage()}
                </div>
            )}
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    streetAddres: '',
                    postCode: '',
                    city: '',
                    country: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    dateOfBirth: '',
                }}
                validationSchema={registerValidationSchema}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);

                    const response = await register({
                        variables: {
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            password: data.password,
                            streetAddress: data.streetAddres,
                            postCode: data.postCode,
                            city: data.city,
                            country: data.country,
                            dateOfBirth: data.dateOfBirth,
                        },
                    });

                    if (response.data?.register) {
                        history.push('/login');
                        setSubmitting(false);
                        resetForm();
                    } else {
                        setAlertMessage('User with that email already exists.');
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <div className={classes.root}>
                        <Form onChange={() => setAlertMessage('')}>
                            <div className={classes.alignedFormContent}>
                                <FormTextField
                                    className={classes.alignedFormField}
                                    name="firstName"
                                    placeholder="First name"
                                    type="input"
                                />
                                <FormTextField
                                    className={classes.alignedFormField}
                                    name="lastName"
                                    placeholder="Last name"
                                    type="input"
                                />
                            </div>
                            <div>
                                <FormTextField
                                    className={classes.formField}
                                    name="streetAddres"
                                    placeholder="Street address"
                                    type="input"
                                />
                                <FormTextField
                                    className={classes.formField}
                                    name="postCode"
                                    placeholder="Post code"
                                    type="input"
                                />
                                <div className={classes.alignedFormContent}>
                                    <FormTextField
                                        className={classes.alignedFormField}
                                        name="city"
                                        placeholder="City"
                                        type="input"
                                    />
                                    <FormTextField
                                        className={classes.alignedFormField}
                                        name="country"
                                        placeholder="Country"
                                        type="input"
                                    />
                                </div>
                                <FormTextField
                                    className={classes.formField}
                                    name="email"
                                    placeholder="Email"
                                    type="input"
                                />
                                <FormTextField
                                    className={classes.formField}
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                />
                                <FormTextField
                                    className={classes.formField}
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    type="password"
                                />
                                <FormTextField
                                    className={classes.formField}
                                    name="dateOfBirth"
                                    type="date"
                                />
                            </div>
                            <div className={classes.formButton}>
                                <ThemeProvider theme={theme}>
                                    <Button
                                        disabled={isSubmitting}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        style={{ marginTop: 12 }}
                                    >
                                        Sign Up
                                    </Button>
                                </ThemeProvider>
                            </div>
                            <div className={classes.loginText}>
                                <p>
                                    Already have an account? <a href="/login">Login here.</a>
                                </p>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
};
