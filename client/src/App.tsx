import React from 'react';
import { WelcomePage } from './components/welcome/welcome_component';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
    return (
        <div>
            <WelcomePage username={'Oliver'} hasAccount={true} />
        </div>
    );
};

export default App;
