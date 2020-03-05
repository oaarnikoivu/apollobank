import React, { useState } from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [register] = useRegisterMutation();

    return (
        <form
            onSubmit={async e => {
                e.preventDefault();

                const response = await register({
                    variables: {
                        firstName,
                        lastName,
                        email,
                        password,
                        phone,
                        dateOfBirth,
                        streetAddress,
                        postCode,
                        city,
                        country,
                    },
                });

                console.log(response);
                history.push('/');
            }}
        >
            <div>
                <input
                    value={firstName}
                    placeholder="First name"
                    onChange={e => {
                        setFirstName(e.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    value={lastName}
                    placeholder="Last name"
                    onChange={e => {
                        setLastName(e.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    value={email}
                    placeholder="Email"
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    value={password}
                    placeholder="Password"
                    type="password"
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    value={phone}
                    placeholder="Phone number"
                    onChange={e => {
                        setPhone(e.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    value={dateOfBirth}
                    placeholder="Date of birth"
                    onChange={e => {
                        setDateOfBirth(e.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    value={streetAddress}
                    placeholder="Street address"
                    onChange={e => {
                        setStreetAddress(e.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    value={postCode}
                    placeholder="Post code"
                    onChange={e => {
                        setPostCode(e.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    value={city}
                    placeholder="City"
                    onChange={e => {
                        setCity(e.target.value);
                    }}
                />
            </div>
            <div>
                <input
                    value={country}
                    placeholder="Country"
                    onChange={e => {
                        setCountry(e.target.value);
                    }}
                />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};
