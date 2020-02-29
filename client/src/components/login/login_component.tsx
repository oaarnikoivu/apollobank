import React, { useState, useCallback, ChangeEvent, MouseEvent } from 'react';
import {
    Container,
    CssBaseline,
    Typography,
    Grid,
    TextField,
    Button,
    Link,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useStyles } from './login.style';
import Joi from 'joi';
import { userLoginSchema } from '../../schemas/validation/user';
import { useHistory } from 'react-router-dom';

const API_ENDPOINT: string = 'http://localhost:8080/auth/login/';

interface LoginUser {
    email: string;
    password: string;
}

enum InvalidLoginErrors {
    EMAIL = 'Email is invalid.',
    PASSWORD = 'Password is invalid.',
}

export const Login: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validUser = useCallback((user: LoginUser): boolean => {
        const result: Joi.ValidationResult<LoginUser> = Joi.validate(user, userLoginSchema);

        if (result.error === null) {
            return true;
        }

        if (result.error.message.includes('email')) {
            setErrorMessage(InvalidLoginErrors.EMAIL);
        } else {
            setErrorMessage(InvalidLoginErrors.PASSWORD);
        }
        return false;
    }, []);

    const loginUser = useCallback(async (): Promise<void> => {
        setErrorMessage('');

        setIsLoading(true);

        const user: LoginUser = {
            email: email,
            password: password,
        };

        if (validUser(user)) {
            await fetch(API_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'content-type': 'application/json',
                },
            })
                .then(async response => {
                    if (response.ok) {
                        return response.json();
                    }
                    const error: Error = await response.json();
                    throw new Error(error.message);
                })
                .then(result => {
                    localStorage.token = result.token;
                    setTimeout(() => {
                        setIsLoading(false);
                        history.push('/accounts');
                    }, 1000);
                })
                .catch((error: Error) => {
                    setTimeout(() => {
                        setIsLoading(false);
                        setErrorMessage(error.message);
                    }, 1000);
                });
        }
    }, [email, password, validUser, history]);

    const renderAlert = (): JSX.Element => {
        return (
            <Alert className={classes.alert} severity="error">
                {errorMessage}
            </Alert>
        );
    };

    const renderLoadingIcon = (): JSX.Element => {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%',
                }}
            >
                <img src="loading.svg" alt="Signing in..." style={{ height: '124px' }}></img>
            </div>
        );
    };

    if (!isLoading) {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {!!errorMessage ? renderAlert() : undefined}
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <Button
                            className={classes.submit}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                loginUser();
                            }}
                        >
                            Sign in
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    onClick={() => {
                                        history.push('/signup');
                                    }}
                                    variant="body2"
                                >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    } else {
        return renderLoadingIcon();
    }
};
