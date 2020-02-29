import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavBar } from '../navbar/navbar_component';

const API_ENDPOINT = 'http://localhost:8080/';

type UserType = {
    email: string;
    firstName: string;
    lastName: string;
};

export const Accounts: React.FC = () => {
    const [user, setUser] = useState<UserType>();
    const history = useHistory();

    useEffect(() => {
        fetch(API_ENDPOINT, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(res =>
            res.json().then(result => {
                if (result.user) {
                    console.log(result.user);
                    setUser(result.user);
                } else {
                    handleLogout();
                }
            }),
        );
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    };

    return (
        <>
            <NavBar hasLogout={true} handleLogout={() => handleLogout()} />
            <h1>Accounts</h1>
            <h1>
                Hello {user?.firstName} {user?.lastName}
            </h1>
        </>
    );
};
