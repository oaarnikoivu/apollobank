import React, { MouseEventHandler } from 'react';
import { Button, ThemeProvider } from '@material-ui/core';
import { theme } from '../../utils/theme';
import { useAccountCardStyles } from '../styles/cards/AccountCard.style';

interface AccountCardProps {
    currency: string;
    fullCurrencyText: string;
    currencyIcon: string;
    balance: number;
    svg?: any | string;
    onClick: MouseEventHandler<any>;
}

export const AccountCard: React.FC<AccountCardProps> = ({
    currency,
    fullCurrencyText,
    currencyIcon,
    balance,
    svg,
    onClick,
}) => {
    const classes = useAccountCardStyles();

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <Button
                    color="primary"
                    className={classes.card}
                    variant="outlined"
                    onClick={onClick}
                >
                    <div className={classes.icon}>
                        {!!svg ? (
                            svg
                        ) : (
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
                                alt="..."
                                style={{ width: 32 }}
                            />
                        )}
                    </div>
                    <div>
                        <div className={classes.cardBalance}>
                            {currencyIcon}
                            {balance}
                        </div>
                        <div className={classes.cardCurrency}>
                            {currency} • {fullCurrencyText}
                        </div>
                    </div>
                </Button>
            </ThemeProvider>
        </div>
    );
};
