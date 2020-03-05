import React, { useState, useEffect } from 'react';
import { Routes } from './Routes';
import { setAccessToken } from './accessToken';

const REFRESH_TOKEN_ENDPOINT = 'http://localhost:4000/refresh_token';

export const App: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(REFRESH_TOKEN_ENDPOINT, {
            method: 'POST',
            credentials: 'include',
        }).then(async res => {
            const { accessToken } = await res.json();
            setAccessToken(accessToken);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>loading...</div>;
    }

    return <Routes />;
};
