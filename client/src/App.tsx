import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { WelcomePage } from './components/welcome/welcome_component';
import { Accounts } from './components/accounts/accounts_component';
import { Routes } from './routes/routes';
import 'react-datepicker/dist/react-datepicker.css';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={WelcomePage} /> />
                <Route path={Routes.ACCOUNTS} exact component={Accounts} />
                <Route path="/" render={() => <div>404</div>} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
