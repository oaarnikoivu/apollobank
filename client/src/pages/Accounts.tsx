import React, { useEffect, useState, MouseEvent } from 'react';
import { useAccountsQuery, useCreateAccountMutation, AccountsDocument } from '../generated/graphql';
import { Button, ThemeProvider } from '@material-ui/core';
import { theme } from '../utils/theme';
import { Loading } from '../components/Loading';
import { AlertMessage } from '../components/AlertMessage';
import { AccountCard } from '../components/cards/AccountCard';
import { Currency } from '../utils/currencies';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Euro } from '../assets/world.svg';
import { ReactComponent as Dollar } from '../assets/flag.svg';
import { ReactComponent as Pound } from '../assets/uk.svg';
import { useAccountsStyles } from './styles/accounts/Accounts.style';

export const Accounts: React.FC = () => {
    const { data, loading } = useAccountsQuery();
    const [createAccount] = useCreateAccountMutation();
    const [totalBalance, setTotalBalance] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');
    const history = useHistory();
    const classes = useAccountsStyles();

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
                        let svg: any | string;
                        let currencyIcon: string = '';
                        let fullCurrencyText: string = '';

                        switch (account.currency) {
                            case Currency.EURO:
                                svg = <Euro />;
                                currencyIcon = '€';
                                fullCurrencyText = 'Euro';
                                break;
                            case Currency.DOLLAR:
                                svg = <Dollar />;
                                currencyIcon = '＄';
                                fullCurrencyText = 'US Dollar';
                                break;
                            case Currency.POUND:
                                svg = <Pound />;
                                currencyIcon = '£';
                                fullCurrencyText = 'British Pound';
                                break;
                            case Currency.BITCOIN:
                                svg = '';
                                currencyIcon = '฿';
                                fullCurrencyText = 'Bitcoin';
                                break;
                        }

                        return (
                            <AccountCard
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
