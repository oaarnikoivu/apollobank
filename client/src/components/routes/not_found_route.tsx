import React from 'react';
import { Route } from 'react-router-dom';

export const NotFoundRoute = () => {
    return <Route path="/" render={() => <div>404</div>} />;
};
