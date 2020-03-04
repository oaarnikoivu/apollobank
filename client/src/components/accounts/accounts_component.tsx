import React, { useCallback, MouseEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavBar } from '../navbar/navbar_component';
import { useUserFromToken } from '../../hooks/useUserFromToken';
import { Button, Card, Typography, CardContent, makeStyles } from '@material-ui/core';

const API_ENDPOINT = 'http://localhost:8080/api/accounts';

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        minWidth: 420,
        marginTop: 12,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
    },
    pos: {
        marginBottom: 12,
    },
});

export const Accounts: React.FC = () => {
    const classes = useStyles();
    const user = useUserFromToken();
    const history = useHistory();
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        async function getAccounts() {
            await fetch(API_ENDPOINT, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(res =>
                res.json().then(accounts => {
                    // make sure user is logged in, if so.. receive the accounts
                    if (user) {
                        setAccounts(accounts);
                    }
                }),
            );
        }
        getAccounts();
    }, [user]);

    const createNewAccount = useCallback(async () => {
        let newAccount = {
            owner: user,
            currency: 'EUR',
            balance: 0,
        };

        await fetch(API_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(newAccount),
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
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
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    }, [user]);

    const determineCardHeader = (account: any) => {
        let header: string = '';
        let currency: string = '';
        switch (account.currency) {
            case 'EUR':
                header = 'Euro 🇪🇺 EUR';
                currency = '€';
                break;
            case 'GBP':
                header = 'British Pound 🇬🇧 GBP';
                currency = '£';
                break;
            case 'USD':
                header = 'US Dollar 🇺🇸 USD';
                currency = '$';
                break;
        }
        return [header, currency];
    };

    return (
        <>
            <NavBar
                hasLogout={true}
                handleLogout={() => {
                    localStorage.removeItem('token');
                    history.push('/login');
                }}
            />
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <h1>
                    {user?.firstName.toUpperCase()} {user?.lastName.toUpperCase()} ACCOUNTS
                </h1>
                <Button
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        createNewAccount();
                    }}
                    color="inherit"
                >
                    Create new account
                </Button>
                <div style={{ marginTop: 24 }}>
                    {accounts.map((account: any, index: number) => {
                        return (
                            <Card key={index} className={classes.root}>
                                <CardContent>
                                    <Typography
                                        className={classes.title}
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        {determineCardHeader(account)[0]}
                                    </Typography>
                                    <Typography>
                                        {determineCardHeader(account)[1]}
                                        {account.balance}
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
