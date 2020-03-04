import React, { useCallback, MouseEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavBar } from '../navbar/navbar_component';
import { useUserFromToken } from '../../hooks/useUserFromToken';
import { Button, Card, Typography, CardContent } from '@material-ui/core';
import { useStyles } from './accounts.style';

const API_ENDPOINT = 'http://localhost:8080/api/accounts';

export const Accounts: React.FC = () => {
    const classes = useStyles();
    const user = useUserFromToken();
    const history = useHistory();
    const [accounts, setAccounts] = useState([]);

    const getAccount = useCallback(
        async (id: string) => {
            await fetch(API_ENDPOINT + `/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(res =>
                res.json().then((account: any) => {
                    if (user) {
                        history.push({
                            pathname: `/accounts/${id}`,
                            state: account,
                        });
                    }
                }),
            );
        },
        [user, history],
    );

    const getAccounts = useCallback(async () => {
        await fetch(API_ENDPOINT, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(res =>
            res.json().then(accounts => {
                if (user) {
                    setAccounts(accounts);
                }
            }),
        );
    }, [user]);

    // when the component mounts immediately fetch the available accounts for the user
    useEffect(() => {
        getAccounts();
    }, [getAccounts]);

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
                    //getAccounts();
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
                <h1>Accounts</h1>
                <Button
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        createNewAccount();
                    }}
                    variant="contained"
                    color="primary"
                >
                    + New
                </Button>
                <div style={{ marginTop: 24 }}>
                    {accounts.map((account: any) => {
                        return (
                            <Card
                                key={account._id}
                                className={classes.root}
                                onClick={() => getAccount(account._id)}
                            >
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
