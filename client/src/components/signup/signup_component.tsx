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
import { useHistory } from 'react-router-dom';
import Joi from 'joi';
import { userSchema } from '../../schemas/user';

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
    const [birthDate, setBirthDate] = useState(new Date());
    const [streetAddress, setStreetAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
                setErrorMessage('First name is invalid.');
            } else if (result.error.message.includes('lastName')) {
                setErrorMessage('Last name is invalid.');
            } else if (result.error.message.includes('email')) {
                setErrorMessage('Email is invalid.');
            } else if (result.error.message.includes('password')) {
                setErrorMessage('Password is invalid.');
            } else if (result.error.message.includes('dateOfBirth')) {
                setErrorMessage('Date of birth is invalid.');
            } else if (result.error.message.includes('phone')) {
                setErrorMessage('Phone number is invalid.');
            } else if (result.error.message.includes('streetAddress')) {
                setErrorMessage('Street address is invalid.');
            } else if (result.error.message.includes('postCode')) {
                setErrorMessage('Post code is invalid.');
            } else if (result.error.message.includes('city')) {
                setErrorMessage('City is invalid.');
            } else if (result.error.message.includes('country')) {
                setErrorMessage('Country is invalid.');
            }
            return false;
        },
        [confirmPassword],
    );

    const registerUser = useCallback(async (): Promise<void> => {
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

        if (validUser(newUser)) {
            let response = await fetch(API_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'content-type': 'application/json',
                },
            });

            if (response.ok) {
                history.push('/');
            }
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
        history,
        validUser,
    ]);

    const renderAlert = (): JSX.Element => {
        return (
            <Alert className={classes.alert} severity="error">
                {errorMessage}
            </Alert>
        );
    };

    return (
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
                                    setBirthDate(new Date(e.target.value));
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
    );
};
