import { Switch, Route, Redirect } from 'react-router-dom';
import React, { ComponentType } from 'react';
import { WelcomePage } from '../welcome/welcome_component';
import { SignUp } from '../signup/signup_component';
import { Login } from '../login/login_component';
import { Accounts } from '../accounts/accounts_component';

interface AuthenticatedRouteProps {
    exact?: boolean;
    path: string;
    component: ComponentType<any>;
}

const AuthenticatedRoute = ({ component: Component, ...rest }: AuthenticatedRouteProps) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem('token') ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/login' }} />
            )
        }
    />
);

const LoggedInRoute = ({ component: Component, ...rest }: AuthenticatedRouteProps) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem('token') ? (
                <Redirect to={{ pathname: '/accounts' }} />
            ) : (
                <Component {...props} />
            )
        }
    />
);

export const Pages = (): JSX.Element => {
    return (
        <Switch>
            <Route path="/" exact component={WelcomePage} />
            <LoggedInRoute path="/login" exact component={Login} />
            <LoggedInRoute path="/signup" exact component={SignUp} />
            <AuthenticatedRoute path="/accounts" exact component={Accounts} />
            <Route path="/" render={() => <div>404</div>} />;
        </Switch>
    );
};
