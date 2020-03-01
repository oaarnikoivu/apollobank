import React from 'react';
import { useHistory } from 'react-router-dom';
import { NavBar } from '../navbar/navbar_component';
import { useUserFromToken } from '../../hooks/useUserFromToken';

export const Accounts: React.FC = () => {
    const user = useUserFromToken();
    const history = useHistory();

    return (
        <>
            <NavBar
                hasLogout={true}
                handleLogout={() => {
                    localStorage.removeItem('token');
                    history.push('/login');
                }}
            />
            <h1>Accounts</h1>
            <h1>
                Hello {user?.firstName} {user?.lastName}
            </h1>
        </>
    );
};
