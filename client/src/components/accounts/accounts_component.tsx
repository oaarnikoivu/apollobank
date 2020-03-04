import React, { useCallback, MouseEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavBar } from '../navbar/navbar_component';
import { useUserFromToken } from '../../hooks/useUserFromToken';
import { Button } from '@material-ui/core';

const API_ENDPOINT = 'http://localhost:8080/api/accounts';

export const Accounts: React.FC = () => {
    const user = useUserFromToken();
    const history = useHistory();
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        async function getAccounts() {
            let data = await fetch(API_ENDPOINT, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(res => {
                return res.json();
            });
            console.log(data);
            setAccounts(data);
        }
        getAccounts();
    }, []);

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

    return (
        <>
            <NavBar
                hasLogout={true}
                handleLogout={() => {
                    localStorage.removeItem('token');
                    history.push('/login');
                }}
            />
            <h1>Accounts</h1>
            <h1>
                Hello {user?.firstName} {user?.lastName}
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
        </>
    );
};
