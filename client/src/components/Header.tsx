import React, { useEffect, useState } from 'react';
import { AppBar, Typography, Button, makeStyles, Toolbar, ThemeProvider } from '@material-ui/core';
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { setAccessToken } from '../accessToken';
import { useHistory } from 'react-router-dom';
import { theme } from '../theme';

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

    // let body: any = null;

    // if (loading) {
    //     body = null;
    // } else if (data && data.me) {
    //     body = (
    //         <div>
    //             You are logged in as: {data.me.firstName} {data.me.lastName}
    //         </div>
    //     );
    // }

    const renderNonAuthUserButtons = () => {
        return (
            <div>
                <Button
                    color="inherit"
                    onClick={e => {
                        e.preventDefault();
                        history.push('/login');
                    }}
                >
                    Login
                </Button>
                <Button
                    color="inherit"
                    onClick={e => {
                        e.preventDefault();
                        history.push('/register');
                    }}
                >
                    Sign Up
                </Button>
            </div>
        );
    };

    const renderAuthUserButtons = () => {
        return (
            <div>
                <Button
                    color="inherit"
                    onClick={e => {
                        e.preventDefault();
                        history.push('/accounts');
                    }}
                >
                    Accounts
                </Button>
                <Button
                    color="inherit"
                    onClick={async () => {
                        await logout().then(() => history.push('/'));
                        setAccessToken('');
                        await client!.resetStore();
                    }}
                >
                    Logout
                </Button>
            </div>
        );
    };

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6">
                            Apollo
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
