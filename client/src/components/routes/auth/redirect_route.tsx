import { Route, Redirect } from 'react-router-dom';
import { Component } from 'react';
import React from 'react';

interface LoggedInRedirectRouteProps {
    exact?: boolean;
    path: string;
    component: React.ComponentType<any>;
}

export const LoggedInRedirectRoute = ({
    component: component,
    ...rest
}: LoggedInRedirectRouteProps) => {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('token') ? (
                    <Redirect to={{ pathname: '/accounts', state: { from: props.location } }} />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};
