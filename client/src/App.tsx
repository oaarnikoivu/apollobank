import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { WelcomePage } from './components/welcome/welcome_component';
import { Accounts } from './components/accounts/accounts_component';
import { Routes } from './routes/routes';
import { Helmet } from 'react-helmet';
import 'typeface-roboto';
import { SignUp } from './components/signup/signup_component';

const App: React.FC = () => {
    return (
        <>
            <Helmet>
                <style>{'body { background-color: snow; }'}</style>
            </Helmet>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={WelcomePage} />
                    <Route path="/signup" exact component={SignUp} />
                    <Route path={Routes.ACCOUNTS} exact component={Accounts} />
                    <Route path="/" render={() => <div>404</div>} />
                </Switch>
            </BrowserRouter>
        </>
    );
};

export default App;
