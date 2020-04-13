import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
    useLoginMutation,
    MeDocument,
    MeQuery,
    LoginMutationVariables,
    LoginMutation,
} from '../../generated/graphql';
import { setAccessToken } from '../../utils/accessToken';
import { Formik, Form } from 'formik';
import { FormTextField } from '../Forms/FormTextField';
import { Button, ThemeProvider } from '@material-ui/core';
import { theme } from '../../utils/theme';
import { loginValidationSchema } from '../../schemas /loginValidationSchema';
import { ErrorMessage } from '../Alerts/AlertMessage';
import { useLoginStyles } from './Login.style';
import { MutationTuple } from '@apollo/react-hooks';
import { ExecutionResult } from 'graphql';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
    const [login]: MutationTuple<LoginMutation, LoginMutationVariables> = useLoginMutation();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const classes = useLoginStyles();

    return (
        <div className={classes.root}>
            <div>
                <h1 className={classes.headerText}>Login</h1>
            </div>
            {errorMessage.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ErrorMessage message={errorMessage} />
                </div>
            )}
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);

                    try {
                        const response: ExecutionResult<LoginMutation> = await login({
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
                            history.push('/accounts');
                            setSubmitting(false);
                            resetForm();
                        }
                    } catch (error) {
                        const errorMessage: string = error.message.split(':')[1];
                        setErrorMessage(errorMessage);
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <div>
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
                                        className={classes.formButton}
                                        disabled={isSubmitting}
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
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
