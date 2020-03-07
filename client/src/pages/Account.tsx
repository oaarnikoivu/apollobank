import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { ReactComponent as Euro } from '../assets/world.svg';
import { ReactComponent as Dollar } from '../assets/flag.svg';
// import { ReactComponent as Bitcoin } from '../assets/Bitcoin.svg';
import { ReactComponent as Pound } from '../assets/uk.svg';

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
});

export const Account: React.FC = () => {
    const history = useHistory<any>();
    const classes = useStyles();

    let currencyIcon: string = '';
    let currencyFullText: string = '';
    let svg: any;

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
                <div style={{ width: 32 }}>{svg}</div>
                <div>{history.location.state.currency}</div>
            </div>
        </div>
    );
};
