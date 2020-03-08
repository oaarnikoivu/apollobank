import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, ThemeProvider, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SwapVert from '@material-ui/icons/SwapVert';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { ReactComponent as Euro } from '../assets/world.svg';
import { ReactComponent as Dollar } from '../assets/flag.svg';
import { ReactComponent as Pound } from '../assets/uk.svg';
import { theme, ColorScheme } from '../theme';

const useStyles = makeStyles({
    root: {
        margin: '0 auto',
        textAlign: 'center',
        marginTop: 24,
    },
    accountBalance: {
        fontSize: 28,
    },
    accountInfo: {
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '240px',
        margin: '0 auto',
        marginTop: 12,
        alignItems: 'center',
    },
    accountButtonsSection: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: '0 auto',
        width: '480px',
        marginTop: 24,
    },
    accountButton: {
        backgroundColor: ColorScheme.PRIMARY,
        color: ColorScheme.WHITE,
        '&:hover, &.Mui-focusVisible': { backgroundColor: ColorScheme.HOVER },
        width: 32,
        height: 32,
    },
    accountButtonSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    accountButtonText: {
        marginTop: 12,
        fontSize: 14,
        color: ColorScheme.INFO,
    },
});

export const Account: React.FC = () => {
    const history = useHistory<any>();
    const classes = useStyles();

    let currencyIcon: string = '';
    let currencyFullText: string = '';
    let svg: any | string;

    switch (history.location.state.currency) {
        case 'EUR':
            currencyIcon = '€';
            currencyFullText = 'Euro';
            svg = <Euro />;
            break;
        case 'USD':
            currencyIcon = '$';
            currencyFullText = 'US Dollar';
            svg = <Dollar />;
            break;
        case 'GBP':
            currencyIcon = '£';
            currencyFullText = 'British Pound';
            svg = <Pound />;
            break;
        case 'BTC':
            currencyIcon = '฿';
            currencyFullText = 'Bitcoin';
            svg = undefined;
            break;
    }

    return (
        <div className={classes.root}>
            <div className={classes.accountBalance}>
                {currencyIcon}
                {history.location.state.balance}
            </div>
            <div className={classes.accountInfo}>
                <div>{currencyFullText}</div>
                <div style={{ width: 32 }}>
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
                <div>{history.location.state.currency}</div>
            </div>
            <div className={classes.accountButtonsSection}>
                <ThemeProvider theme={theme}>
                    <div>
                        <IconButton className={classes.accountButton} aria-label="Add">
                            <AddIcon />
                        </IconButton>
                        <div className={classes.accountButtonText}>Add</div>
                    </div>
                    <div>
                        <IconButton className={classes.accountButton} aria-label="Exchange">
                            <SwapVert />
                        </IconButton>
                        <div className={classes.accountButtonText}>Exchange</div>
                    </div>
                    <div>
                        <IconButton className={classes.accountButton} aria-label="Details">
                            <InfoOutlinedIcon />
                        </IconButton>
                        <div className={classes.accountButtonText}>Details</div>
                    </div>
                </ThemeProvider>
            </div>
        </div>
    );
};
