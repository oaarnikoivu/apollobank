import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export const NavBar: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        Express
                    </IconButton>
                    <Typography className={classes.title} variant="h6"></Typography>
                    <Button onClick={() => history.push('/login')} color="inherit">
                        Login
                    </Button>
                    <Button onClick={() => history.push('/signup')} color="inherit">
                        Register
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};
