import React, { useEffect } from 'react';

const API_ENDPOINT = 'http://localhost:8080/';

export const Accounts: React.FC = () => {
    useEffect(() => {
        fetch(API_ENDPOINT, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(res =>
            res.json().then(result => {
                console.log(result);
            }),
        );
    }, []);

    return (
        <>
            <div>Accounts page</div>
        </>
    );
};
