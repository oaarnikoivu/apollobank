import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'typeface-roboto';
import { Pages } from './components/pages/pages_component';

const App: React.FC = () => {
    return (
        <>
            <Helmet>
                <style>{'body { background-color: snow; }'}</style>
            </Helmet>
            <BrowserRouter>
                <Pages />
            </BrowserRouter>
        </>
    );
};

export default App;
