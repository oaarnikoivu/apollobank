import React, { useEffect, useState } from 'react';
import { useAccountsQuery, useCreateAccountMutation, AccountsDocument } from '../generated/graphql';
import { makeStyles, Button, ThemeProvider } from '@material-ui/core';
import { theme } from '../theme';
import { Loading } from '../components/Loading';
import { AlertMessage } from '../components/AlertMessage';

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
});

export const Accounts: React.FC = () => {
    const { data, loading } = useAccountsQuery();
    const [createAccount] = useCreateAccountMutation();
    const [alertMessage, setAlertMessage] = useState('');
    const classes = useStyles();

    useEffect(() => {}, [loading, data]);

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
                        color="primary"
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
            <div>
                <ul>
                    {data.accounts.map(account => {
                        return (
                            <li key={account.id}>
                                {account.currency} {account.balance}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
