import React from 'react';
import { Alert } from '@material-ui/lab';

interface AlertMessageProps {
    message: string;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({ message }) => {
    return (
        <Alert variant="outlined" severity="error">
            {message}
        </Alert>
    );
};
