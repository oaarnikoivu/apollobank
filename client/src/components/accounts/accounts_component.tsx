import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

export const Accounts: React.FC<Props> = ({ history }) => {
    console.log('Accounts', history.location.state);
    return <div>Accounts</div>;
};
