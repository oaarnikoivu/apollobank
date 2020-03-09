import React, { useState, useEffect } from 'react';
import { useSideDrawerStyles } from './SideDrawer.style';
import { useMeQuery, useLogoutMutation } from '../../generated/graphql';
import { useHistory } from 'react-router-dom';
import { setAccessToken } from '../../utils/accessToken';

const authUserNavigationItems: string[] = ['Accounts', 'Insights', 'Logout'];
const nonAuthUserNavigationItems: string[] = ['Login', 'Sign Up'];

interface SideDrawerProps {
    show: boolean;
}

export const SideDrawer: React.FC<SideDrawerProps> = (props: SideDrawerProps) => {
    const { data, loading } = useMeQuery();
    const [logout, { client }] = useLogoutMutation();
    const [showAuthUserNavigationItems, setShowAuthUserNavigationItems] = useState(false);
    const history = useHistory();
    const classes = useSideDrawerStyles();

    useEffect(() => {
        if (!loading && data && data.me) {
            setShowAuthUserNavigationItems(true);
        } else {
            setShowAuthUserNavigationItems(false);
        }
    }, [data, loading]);

    let drawerClasses = classes.siderDrawer;

    if (props.show) {
        drawerClasses = classes.siderDrawer + ' ' + classes.open;
    }

    const renderAuthUserNavigationItems = () => {
        return (
            <>
                {authUserNavigationItems.map(item => {
                    let routeTo: string = '/';
                    let logOutClicked: boolean = false;

                    switch (item) {
                        case 'Accounts':
                            routeTo = '/accounts';
                            break;
                        case 'Insights':
                            routeTo = '/';
                            break;
                        case 'Logout':
                            logOutClicked = true;
                            break;
                    }

                    return (
                        <li key={item}>
                            <a
                                href="/whatevs"
                                onClick={async e => {
                                    e.preventDefault();
                                    if (logOutClicked) {
                                        await logout().then(() => history.push('/'));
                                        setAccessToken('');
                                        await client!.resetStore();
                                    }
                                    history.push(routeTo);
                                }}
                            >
                                {item}
                            </a>
                        </li>
                    );
                })}
            </>
        );
    };

    const renderNonAuthUserNavigationItems = () => {
        return (
            <>
                {nonAuthUserNavigationItems.map(item => {
                    let routeTo: string = '/';

                    switch (item) {
                        case 'Login':
                            routeTo = '/login';
                            break;
                        case 'Sign Up':
                            routeTo = '/register';
                            break;
                    }

                    return (
                        <li key={item}>
                            <a
                                href="/whatevs"
                                onClick={e => {
                                    e.preventDefault();
                                    history.push(routeTo);
                                }}
                            >
                                {item}
                            </a>
                        </li>
                    );
                })}
            </>
        );
    };

    return (
        <nav className={drawerClasses}>
            <ul>
                {!!showAuthUserNavigationItems
                    ? renderAuthUserNavigationItems()
                    : renderNonAuthUserNavigationItems()}
            </ul>
        </nav>
    );
};
