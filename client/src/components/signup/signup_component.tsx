import React, { useState, ChangeEvent, useCallback } from 'react';
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
import { User } from '../../models/user';
import { useStyles } from './signup.style';
import Joi from 'joi';
import { userSchema } from '../../schemas/user';
import { useHistory } from 'react-router-dom';
import { InvalidSignupErrors } from './signup_interfaces';

const API_ENDPOINT: string = 'http://localhost:8080/auth/signup/';

export const SignUp: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validUser = useCallback(
        (user: User): boolean => {
            if (user.password !== confirmPassword) {
                setErrorMessage('Passwords must match.');
                return false;
            }

            const result = Joi.validate(user, userSchema);

            if (result.error === null) {
                return true;
            }

            if (result.error.message.includes('firstName')) {
                setErrorMessage(InvalidSignupErrors.FIRST_NAME);
            } else if (result.error.message.includes('lastName')) {
                setErrorMessage(InvalidSignupErrors.LAST_NAME);
            } else if (result.error.message.includes('email')) {
                setErrorMessage(InvalidSignupErrors.EMAIL);
            } else if (result.error.message.includes('password')) {
                setErrorMessage(InvalidSignupErrors.PASSWORD);
            } else if (result.error.message.includes('dateOfBirth')) {
                setErrorMessage(InvalidSignupErrors.BIRTH_DATE);
            } else if (result.error.message.includes('phone')) {
                setErrorMessage(InvalidSignupErrors.PHONE);
            } else if (result.error.message.includes('streetAddress')) {
                setErrorMessage(InvalidSignupErrors.STREET_ADDRESS);
            } else if (result.error.message.includes('postCode')) {
                setErrorMessage(InvalidSignupErrors.POST_CODE);
            } else if (result.error.message.includes('city')) {
                setErrorMessage(InvalidSignupErrors.CITY);
            } else if (result.error.message.includes('country')) {
                setErrorMessage(InvalidSignupErrors.COUNTRY);
            }
            return false;
        },
        [confirmPassword],
    );

    const registerUser = useCallback(async () => {
        setErrorMessage('');

        const newUser: User = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: birthDate,
            phone: phone,
            streetAddress: streetAddress,
            postCode: postCode,
            city: city,
            country: country,
        };

        setIsLoading(true);

        if (validUser(newUser)) {
            await fetch(API_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'content-type': 'application/json',
                },
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    return response.json().then((error: Error) => {
                        throw new Error(error.message);
                    });
                })
                .then(() => {
                    setTimeout(() => {
                        setIsLoading(false);
                        history.push('/login');
                    }, 1000);
                })
                .catch((error: Error) => {
                    setTimeout(() => {
                        setIsLoading(false);
                        setErrorMessage(error.message);
                    }, 1000);
                });
        }
    }, [
        email,
        password,
        firstName,
        lastName,
        birthDate,
        phone,
        streetAddress,
        postCode,
        city,
        country,
        validUser,
        history,
    ]);

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
                <img src="loading.svg" alt="Singing Up..." style={{ height: '124px' }}></img>
            </div>
        );
    };

    if (!isLoading) {
        return (
            <>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        {!!errorMessage ? renderAlert() : undefined}
                        <form className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstNmae"
                                        label="First Name"
                                        autoFocus
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                            setFirstName(e.target.value);
                                            setErrorMessage('');
                                        }}
                                    ></TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="lname"
                                        name="lastName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                            setLastName(e.target.value);
                                            setErrorMessage('');
                                        }}
                                    ></TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                            setEmail(e.target.value);
                                            setErrorMessage('');
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                            setPassword(e.target.value);
                                            setErrorMessage('');
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm password"
                                        type="password"
                                        id="confirmPassword"
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                            setConfirmPassword(e.target.value);
                                            setErrorMessage('');
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="phone"
                                        label="Phone Number"
                                        id="phone"
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                            setPhone(e.target.value);
                                            setErrorMessage('');
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        className={classes.datepicker}
                                        variant="outlined"
                                        required
                                        id="date"
                                        label="Date of birth"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                            setBirthDate(e.target.value);
                                            setErrorMessage('');
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="streetAddress"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="streetAddress"
                                        label="Street Address"
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                            setStreetAddress(e.target.value);
                                            setErrorMessage('');
                                        }}
                                    ></TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="postCode"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="postCode"
                                        label="Post Code"
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                            setPostCode(e.target.value);
                                            setErrorMessage('');
                                        }}
                                    ></TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="city"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="city"
                                        label="City"
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                            setCity(e.target.value);
                                            setErrorMessage('');
                                        }}
                                    ></TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="country"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="country"
                                        label="Country"
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                            setCountry(e.target.value);
                                            setErrorMessage('');
                                        }}
                                    ></TextField>
                                </Grid>
                            </Grid>

                            <Button
                                className={classes.submit}
                                type="submit"
                                fullWidth
                                variant="outlined"
                                color="primary"
                                onClick={e => {
                                    e.preventDefault();
                                    registerUser();
                                }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </>
        );
    } else {
        return renderLoadingIcon();
    }
};
