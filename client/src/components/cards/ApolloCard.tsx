import React, { MouseEvent } from './node_modules/react';
import { ThemeProvider, Button } from './node_modules/@material-ui/core';
import AddIcon from './node_modules/@material-ui/icons/Add';
import { theme } from '../../utils/theme';
import { ReactComponent as MasterCard } from '../../assets/mc_symbol.svg';

interface ApolloCardProps {
    cardNumber?: string;
    validThru?: string;
    cvv?: number;
    onCreateNewCardClicked?(e: MouseEvent<HTMLButtonElement>): void;
}

export const ApolloCard: React.FC<ApolloCardProps> = ({ cardNumber, validThru, cvv }) => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <span role="img" aria-label="logo">
                        🚀
                    </span>
                </div>
                <div style={{ fontSize: 18, letterSpacing: 2 }}>{cardNumber}</div>
                <div style={{ width: 64 }}>
                    <MasterCard />
                </div>
            </div>
            <div>
                <div style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>valid thru: </div>
                <div>{validThru}</div>
            </div>
            <div>
                <div style={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>cvv</div>
                <div>{cvv}</div>
            </div>
        </>
    );
};

export const NoApolloCard: React.FC<ApolloCardProps> = ({ onCreateNewCardClicked }) => {
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
