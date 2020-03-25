import React, { useState, useEffect } from 'react';
import { Routes } from './Routes';
import { setAccessToken } from './utils/accessToken';
import { Loading } from './components/Loading/Loading';

export const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch((process.env.REACT_APP_SERVER_URL as string) + '/refresh_token', {
            method: 'POST',
            credentials: 'include',
        }).then(async res => {
            const { accessToken } = await res.json();
            setAccessToken(accessToken);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loading />;
    }

    return <Routes />;
};
