import React, { MouseEvent } from 'react';
import { ThemeProvider, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { theme } from '../../utils/theme';

interface ApolloCardProps {
    cardNumber: string;
    validThru: string;
    cvv: number;
}

interface NoApolloCardProps {
    onCreateNewCardClicked(e: MouseEvent<HTMLButtonElement>): void;
}

export const ApolloCard: React.FC<ApolloCardProps> = ({ cardNumber, validThru, cvv }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {cardNumber}
        </div>
    );
};

export const NoApolloCard: React.FC<NoApolloCardProps> = ({ onCreateNewCardClicked }) => {
    return (
        <div
            style={{
                display: 'flex',
                marginTop: '62px',
                justifyContent: 'center',
            }}
        >
            <ThemeProvider theme={theme}>
                <Button
                    style={{ fontWeight: 'bold', textTransform: 'none', letterSpacing: 1 }}
                    color="primary"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onCreateNewCardClicked}
                >
                    Create new card
                </Button>
            </ThemeProvider>
        </div>
    );
};
