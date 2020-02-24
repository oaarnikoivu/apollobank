import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { WelcomePage } from './components/welcome/welcome_component';
import { Accounts } from './components/accounts/accounts_component';
import { Routes } from './routes/apiRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path="/"
                    exact
                    render={() => <WelcomePage username={'Oliver'} hasAccount={true} />}
                />
                <Route path={Routes.ACCOUNTS} exact component={Accounts} />
                <Route path="/" render={() => <div>404</div>} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
