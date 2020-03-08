import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useLoginMutation, MeDocument, MeQuery } from '../generated/graphql';
import { setAccessToken } from '../accessToken';
import { Formik, Form } from 'formik';
import { FormTextField } from '../components/FormTextField';
import { Button, ThemeProvider } from '@material-ui/core';
import { theme } from '../utils/theme';
import { loginValidationSchema } from '../schemas /loginValidationSchema';
import { AlertMessage } from '../components/AlertMessage';
import { useLoginStyles } from './styles/login/Login.style';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
    const [login] = useLoginMutation();
    const [alertMessage, setAlertMessage] = useState('');
    const classes = useLoginStyles();

    return (
        <div>
            <div>
                <h1 className={classes.headerText}>Login</h1>
            </div>
            {alertMessage.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <AlertMessage message={alertMessage} />
                </div>
            )}
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);

                    try {
                        const response = await login({
                            variables: {
                                email: data.email,
                                password: data.password,
                            },
                            update: (store, { data }) => {
                                if (!data) {
                                    return null;
                                }
                                store.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: {
                                        me: data.login.user,
                                    },
                                });
                            },
                        });

                        if (response && response.data) {
                            setAccessToken(response.data.login.accessToken);
                            history.push('/dashboard');
                            setSubmitting(false);
                            resetForm();
                        }
                    } catch (error) {
                        const errorMessage = error.message.split(':')[1];
                        setAlertMessage(errorMessage);
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <div className={classes.root}>
                        <Form>
                            <div>
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
                                        Login
                                    </Button>
                                </ThemeProvider>
                            </div>
                            <div className={classes.registerText}>
                                <p>
                                    Don't have an account? <a href="/register">Sign up here.</a>
                                </p>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
};
