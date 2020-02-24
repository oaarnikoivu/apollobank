import React from 'react';
import { WelcomePage } from './components/landing/welcome_component';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
    return (
        <div className={''}>
            <WelcomePage username={'Oliver'} hasAccount={true} />
        </div>
    );
};

export default App;
