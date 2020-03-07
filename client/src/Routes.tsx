import React, { ComponentType } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Header } from './components/Header';
import { Accounts } from './pages/Accounts';
import { getAccessToken } from './accessToken';
import { Account } from './pages/Account';

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
    return (
        <>
            <Helmet>
                <style>{'body { background-color: snow; }'}</style>
            </Helmet>
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <LoggedInRoute exact path="/register" component={Register} />
                        <LoggedInRoute exact path="/login" component={Login} />
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
                </div>
            </BrowserRouter>
        </>
    );
};
