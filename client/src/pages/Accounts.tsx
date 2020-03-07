import React, { useEffect, useState, MouseEvent } from 'react';
import { useAccountsQuery, useCreateAccountMutation, AccountsDocument } from '../generated/graphql';
import { makeStyles, Button, ThemeProvider } from '@material-ui/core';
import { theme, ColorScheme } from '../theme';
import { Loading } from '../components/Loading';
import { AlertMessage } from '../components/AlertMessage';
import { Card } from '../components/Card';
import { Currency } from '../utils/currencies';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        textalign: 'center',
        flexDirection: 'column',
    },
    newAccountButton: {
        position: 'absolute',
        right: 20,
        marginTop: 10,
    },
    accountInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 15,
        color: ColorScheme.INFO,
    },
    accountList: {
        marginTop: 8,
    },
});

export const Accounts: React.FC = () => {
    const { data, loading } = useAccountsQuery();
    const [createAccount] = useCreateAccountMutation();
    const [totalBalance, setTotalBalance] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        let balance = 0;
        if (data) {
            data.accounts.forEach(account => {
                balance += account.balance;
            });
        }
        setTotalBalance(balance);
    }, [loading, data]);

    if (!data) {
        return <Loading />;
    }

    return (
        <div className={classes.root}>
            <div>
                <h2>Accounts</h2>
            </div>
            {alertMessage.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <AlertMessage message={alertMessage} />
                </div>
            )}
            <div className={classes.newAccountButton}>
                <ThemeProvider theme={theme}>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={async e => {
                            e.preventDefault();

                            const currency: string = 'BTC';

                            try {
                                const response = await createAccount({
                                    variables: {
                                        currency: currency,
                                    },
                                    refetchQueries: [
                                        {
                                            query: AccountsDocument,
                                            variables: {},
                                        },
                                    ],
                                });
                                if (response && response.data) {
                                    console.log('working...');
                                }
                            } catch (error) {
                                const errorMessage = error.message.split(':')[1];
                                setAlertMessage(errorMessage);
                            }
                        }}
                    >
                        + New
                    </Button>
                </ThemeProvider>
            </div>
            <div style={{ marginTop: 8 }}>
                <div className={classes.accountInfo}>
                    <div>Currencies</div>
                    <div>€{totalBalance}</div>
                </div>
                <div className={classes.accountList}>
                    {data.accounts.map(account => {
                        let svg: string = '';
                        let currencyIcon: string = '';
                        let fullCurrencyText: string = '';

                        switch (account.currency) {
                            case Currency.EURO:
                                svg = 'world.svg';
                                currencyIcon = '€';
                                fullCurrencyText = 'Euro';
                                break;
                            case Currency.DOLLAR:
                                svg = 'flag.svg';
                                currencyIcon = '＄';
                                fullCurrencyText = 'US Dollar';
                                break;
                            case Currency.POUND:
                                svg = 'uk.svg';
                                currencyIcon = '£';
                                fullCurrencyText = 'British Pound';
                                break;
                            case Currency.BITCOIN:
                                svg = 'Bitcoin.svg';
                                currencyIcon = '฿';
                                fullCurrencyText = 'Bitcoin';
                                break;
                        }

                        return (
                            <Card
                                key={account.id}
                                currency={account.currency}
                                fullCurrencyText={fullCurrencyText}
                                currencyIcon={currencyIcon}
                                balance={account.balance}
                                svg={svg}
                                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                    e.preventDefault();
                                    history.push({
                                        pathname: `/accounts/${account.id}`,
                                        state: account,
                                    });
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
