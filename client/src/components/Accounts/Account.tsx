import React from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeProvider, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SwapVert from '@material-ui/icons/SwapVert';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { ReactComponent as Euro } from '../../assets/world.svg';
import { ReactComponent as Dollar } from '../../assets/flag.svg';
import { ReactComponent as Pound } from '../../assets/uk.svg';
import { theme } from '../../utils/theme';
import { TransactionCard } from '../cards/TransactionCard';
import { useAccountStyles } from './Account.style';

interface Transaction {
    date: string;
    title: string;
    time: string;
    income: number;
    expenses: number;
}

let transactions: Transaction[] = [];

transactions.push(
    {
        date: 'Today',
        title: 'Asda Aberdeen Beach Superstore',
        time: '15:52',
        income: 0,
        expenses: 24.28,
    },
    {
        date: 'Today',
        title: 'Robert Gordon University',
        time: '12:30',
        income: 0,
        expenses: 3.79,
    },
    {
        date: 'Today',
        title: 'Robert Gordon University',
        time: '12:30',
        income: 0,
        expenses: 3.79,
    },
    {
        date: 'Today',
        title: 'Robert Gordon University',
        time: '12:30',
        income: 0,
        expenses: 3.79,
    },
    {
        date: 'Today',
        title: 'Robert Gordon University',
        time: '12:30',
        income: 0,
        expenses: 3.79,
    },
);

const Transactions = (): JSX.Element => {
    const classes = useAccountStyles();

    return (
        <div>
            <div className={classes.transactions}>
                <div className={classes.transactionsHeader}>Today</div>
                <div className={classes.transactionCards}>
                    {transactions.map((transaction, index) => {
                        return (
                            <TransactionCard
                                key={index}
                                title={transaction.title}
                                time={transaction.time}
                                card={6254}
                                fee={0}
                                amount={
                                    !!transaction.expenses
                                        ? transaction.expenses
                                        : transaction.income
                                }
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export const Account: React.FC = () => {
    const history = useHistory<any>();
    const classes = useAccountStyles();

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
            <hr style={{ width: 480, marginTop: 24, color: '#fcfcfc' }} />
            <Transactions />
        </div>
    );
};
