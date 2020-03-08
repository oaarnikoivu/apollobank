import React, { useEffect, useState } from 'react';
import { AppBar, Typography, Button, makeStyles, Toolbar, ThemeProvider } from '@material-ui/core';
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { setAccessToken } from '../accessToken';
import { useHistory } from 'react-router-dom';
import { theme } from '../utils/theme';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
});

export const Header: React.FC = () => {
    const { data, loading } = useMeQuery();
    const [logout, { client }] = useLogoutMutation();
    const [showAuthUserButtons, setShowAuthUserButtons] = useState(false);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        if (!loading && data && data.me) {
            setShowAuthUserButtons(true);
        } else {
            setShowAuthUserButtons(false);
        }
    }, [data, loading]);

    const renderNonAuthUserButtons = () => {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <Button
                        color="primary"
                        onClick={e => {
                            e.preventDefault();
                            history.push('/login');
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        color="primary"
                        onClick={e => {
                            e.preventDefault();
                            history.push('/register');
                        }}
                    >
                        Sign Up
                    </Button>
                </ThemeProvider>
            </div>
        );
    };

    const renderAuthUserButtons = () => {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <Button
                        color="primary"
                        onClick={e => {
                            e.preventDefault();
                            history.push('/dashboard');
                        }}
                    >
                        Dashboard
                    </Button>
                    <Button
                        style={{ marginLeft: 12 }}
                        color="primary"
                        onClick={e => {
                            e.preventDefault();
                            history.push('/accounts');
                        }}
                    >
                        Accounts
                    </Button>
                    <Button
                        style={{ marginLeft: 12 }}
                        color="primary"
                        onClick={async () => {
                            await logout().then(() => history.push('/'));
                            setAccessToken('');
                            await client!.resetStore();
                        }}
                    >
                        Logout
                    </Button>
                </ThemeProvider>
            </div>
        );
    };

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
                    <Toolbar>
                        <Typography
                            className={classes.title}
                            variant="h5"
                            style={{ color: 'black' }}
                        >
                            AP
                        </Typography>
                        {!!showAuthUserButtons
                            ? renderAuthUserButtons()
                            : renderNonAuthUserButtons()}
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    );
};
