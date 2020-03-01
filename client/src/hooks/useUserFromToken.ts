import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const API_ENDPOINT = 'http://localhost:8080/';

type UserType = {
    email: string;
    firstName: string;
    lastName: string;
};

export const useUserFromToken = () => {
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
                    setUser(result.user);
                } else {
                    localStorage.removeItem('token');
                    history.push('/login');
                }
            }),
        );
    });
    return user;
};
