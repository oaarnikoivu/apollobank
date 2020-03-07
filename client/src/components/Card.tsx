import React from 'react';
import { Button, makeStyles, ThemeProvider } from '@material-ui/core';
import { theme, ColorScheme } from '../theme';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    icon: {
        position: 'absolute',
        left: 40,
        width: 32,
    },
    card: {
        marginTop: 8,
        width: 480,
        height: 84,
        borderTop: 'none',
        borderRight: 'none',
        borderLeft: 'none',
        borderRadius: 0,
    },
    cardBalance: {
        color: 'black',
    },
    cardCurrency: {
        color: ColorScheme.INFO,
        textTransform: 'none',
    },
});

interface CardProps {
    currency: string;
    fullCurrencyText: string;
    currencyIcon: string;
    balance: number;
    svg?: string;
    onClick(): void;
}

export const Card: React.FC<CardProps> = ({
    currency,
    fullCurrencyText,
    currencyIcon,
    balance,
    svg,
    onClick,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <Button
                    color="primary"
                    className={classes.card}
                    variant="outlined"
                    onClick={() => onClick()}
                >
                    <div className={classes.icon}>
                        <img src={svg} alt="..." style={{ width: 32 }} />
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
