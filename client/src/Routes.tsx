import React, { ComponentType, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Accounts } from './pages/Accounts';
import { getAccessToken } from './accessToken';
import { Account } from './pages/Account';
import { Dashboard } from './pages/Dashboard';
import { Toolbar } from './components/Toolbar/Toolbar';
import { SideDrawer } from './components/SideDrawer/SideDrawer';
import { Backdrop } from './components/Backdrop/Backdrop';
import { ColorScheme } from './utils/theme';

interface AuthenticatedRouteProps {
    exact?: boolean;
    path: string;
    component: ComponentType<any>;
}

const AuthenticatedRoute = ({ component: Component, ...rest }: AuthenticatedRouteProps) => (
    <Route
        {...rest}
        render={props =>
            getAccessToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />
        }
    />
);

const LoggedInRoute = ({ component: Component, ...rest }: AuthenticatedRouteProps) => (
    <Route
        {...rest}
        render={props =>
            getAccessToken() ? (
                <Redirect to={{ pathname: '/accounts' }} />
            ) : (
                <Component {...props} />
            )
        }
    />
);

export const Routes: React.FC = () => {
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
    let backdrop: any;

    const drawerToggleClickHandler = () => {
        setSideDrawerOpen(true);
    };

    const backdropClickHandler = () => {
        setSideDrawerOpen(false);
    };

    if (sideDrawerOpen) {
        backdrop = <Backdrop click={backdropClickHandler} />;
    }

    return (
        <>
            <Helmet>
                <style>{`body { background-color: ${ColorScheme.WHITE}; }`}</style>
            </Helmet>
            <BrowserRouter>
                <div style={{ height: '100%' }}>
                    <Toolbar drawerClickHandler={drawerToggleClickHandler} />
                    <SideDrawer show={sideDrawerOpen} />
                    {backdrop}
                    <main style={{ marginTop: 64 }}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <LoggedInRoute exact path="/register" component={Register} />
                            <LoggedInRoute exact path="/login" component={Login} />
                            <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
                            <AuthenticatedRoute exact path="/accounts" component={Accounts} />
                            <AuthenticatedRoute exact path="/accounts/:id" component={Account} />
                            <Route
                                path="/"
                                render={() => (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginTop: 12,
                                        }}
                                    >
                                        404 Not Found
                                    </div>
                                )}
                            />
                        </Switch>
                    </main>
                </div>
            </BrowserRouter>
        </>
    );
};
