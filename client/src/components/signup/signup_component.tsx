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
import { User } from '../../models/user';
import { useStyles } from './signup.style';
import { useHistory } from 'react-router-dom';

const API_ENDPOINT = 'http://localhost:8080/auth/signup/';

export const SignUp: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [streetAddress, setStreetAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const registerUser = useCallback(async (): Promise<void> => {
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

        let response = await fetch(API_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'content-type': 'application/json',
            },
        });

        if (response.ok) {
            history.push('/');
        } else {
            response.json().then(r => console.log(r));
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
    ]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
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
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                    setFirstName(e.target.value)
                                }
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
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                    setLastName(e.target.value)
                                }
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
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                    setEmail(e.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                    setPassword(e.target.value)
                                }
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
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                    setPhone(e.target.value)
                                }
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
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                    setBirthDate(new Date(e.target.value))
                                }
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
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                    setStreetAddress(e.target.value)
                                }
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
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                    setPostCode(e.target.value)
                                }
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
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                    setCity(e.target.value)
                                }
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
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                    setCountry(e.target.value)
                                }
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
