import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import 'typeface-roboto';

export const Routes: React.FC = () => {
    return (
        <>
            <Helmet>
                <style>{'body { background-color: snow; }'}</style>
            </Helmet>
            <BrowserRouter>
                <div>
                    <header>
                        <div>
                            <Link to="/">Home</Link>
                        </div>
                        <div>
                            <Link to="/register">Register</Link>
                        </div>
                        <div>
                            <Link to="/login">Login</Link>
                        </div>
                    </header>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </div>
            </BrowserRouter>
        </>
    );
};
