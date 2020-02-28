import { Route, Redirect } from 'react-router-dom';
import React from 'react';

interface AuthenticatedRouteProps {
    exact?: boolean;
    path: string;
    component: React.ComponentType<any>;
}

export const AuthenticatedRoute = ({
    component: Component,
    ...rest
}: AuthenticatedRouteProps): JSX.Element => {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('token') ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    );
};
