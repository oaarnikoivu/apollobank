import React, { useState, useEffect } from 'react';
import { useToolbarStyles } from './Toolbar.style';
import { DrawerToggleButton } from '../SideDrawer/DrawerToggleButton';
import { useMeQuery, useLogoutMutation } from '../../generated/graphql';
import { useHistory } from 'react-router-dom';
import { setAccessToken } from '../../utils/accessToken';

interface ToolbarProps {
    drawerClickHandler(): void;
}

const navigationItems: string[] = ['Accounts', 'Insights'];

export const Toolbar: React.FC<ToolbarProps> = (props: ToolbarProps) => {
    const { data, loading } = useMeQuery();
    const [logout, { client }] = useLogoutMutation();
    const [showAuthUserButtons, setShowAuthUserButtons] = useState(false);
    const history = useHistory();
    const classes = useToolbarStyles();

    useEffect(() => {
        if (!loading && data && data.me) {
            setShowAuthUserButtons(true);
        } else {
            setShowAuthUserButtons(false);
        }
    }, [data, loading]);

    const renderAuthUserButtons = () => {
        return (
            <>
                {navigationItems.map(item => {
                    let routeTo: string = '/';

                    switch (item) {
                        case 'Accounts':
                            routeTo = '/accounts';
                            break;
                        case 'Insights':
                            routeTo = '/';
                            break;
                    }
                    return (
                        <li key={item}>
                            <a href={routeTo}>{item}</a>
                        </li>
                    );
                })}
                <button
                    className={classes.navButton}
                    onClick={async e => {
                        e.preventDefault();
                        await logout().then(() => history.push('/'));
                        setAccessToken('');
                        await client!.resetStore();
                    }}
                >
                    Logout
                </button>
            </>
        );
    };

    const renderNonAuthUserButtons = () => {
        return (
            <>
                <button
                    className={classes.navButton}
                    onClick={e => {
                        e.preventDefault();
                        history.push('/login');
                    }}
                >
                    Login
                </button>
                <button
                    className={classes.navButton}
                    onClick={e => {
                        e.preventDefault();
                        history.push('/register');
                    }}
                >
                    Sign Up
                </button>
            </>
        );
    };

    return (
        <header className={classes.toolbar}>
            <nav className={classes.navigation}>
                <div className={classes.toggleButton}>
                    <DrawerToggleButton click={props.drawerClickHandler} />
                </div>
                <div className={classes.logo}>
                    <a href="/">
                        <span role="img" aria-label="logo">
                            🚀
                        </span>
                    </a>
                </div>
                <div className={classes.spacer} />
                <div className={classes.navigationItems}>
                    <ul>
                        {!!showAuthUserButtons
                            ? renderAuthUserButtons()
                            : renderNonAuthUserButtons()}
                    </ul>
                </div>
            </nav>
        </header>
    );
};
