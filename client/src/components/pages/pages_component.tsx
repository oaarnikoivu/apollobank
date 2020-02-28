import { Switch, Route } from 'react-router-dom';
import React from 'react';
import { WelcomePage } from '../welcome/welcome_component';
import { SignUp } from '../signup/signup_component';
import { Login } from '../login/login_component';
import { AuthenticatedRoute } from '../routes/auth/authenticated_route';
import { Accounts } from '../accounts/accounts_component';
import { Routes } from '../../routes/routes';
import { NotFoundRoute } from '../routes/not_found_route';
import { LoggedInRedirectRoute } from '../routes/auth/redirect_route';

export const Pages = (): JSX.Element => {
    return (
        <Switch>
            <Route path="/" exact component={WelcomePage} />
            <LoggedInRedirectRoute path="/login" exact={true} component={Login} />
            <LoggedInRedirectRoute path="/signup" exact={true} component={SignUp} />
            <AuthenticatedRoute path={Routes.ACCOUNTS} exact={true} component={Accounts} />
            <NotFoundRoute />
        </Switch>
    );
};
