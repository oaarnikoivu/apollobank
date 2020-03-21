import React, { useState, useEffect, MouseEvent } from 'react';
import {
    Container,
    Grid,
    Paper,
    Button,
    ThemeProvider,
    List,
    ListItemText,
    ListItem,
    ListItemIcon,
} from '@material-ui/core';
import { Chart } from '../Charts/Chart';
import { Title } from '../Typography/Title';
import { ReactComponent as Euro } from '../../assets/world.svg';
import { ReactComponent as Dollar } from '../../assets/flag.svg';
import { ReactComponent as Pound } from '../../assets/uk.svg';
import {
    useAccountsQuery,
    useCreateAccountMutation,
    AccountsDocument,
} from '../../generated/graphql';
import { Loading } from '../Loading/Loading';
import { useHistory } from 'react-router-dom';
import { useAccountsStyles } from './styles/Accounts.style';
import { AccountsCard, NoAccountsCard } from '../Cards/AccountsCard';
import { Currency } from '../../utils/currencies';
import { theme } from '../../utils/theme';
import { Dialog } from '../Dialog/Dialog';

const currencies = ['EUR', 'USD', 'GBP', 'BTC'];

export const Accounts: React.FC = () => {
    const { data, loading } = useAccountsQuery();
    const [createAccount] = useCreateAccountMutation();
    const [totalBalance, setTotalBalance] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const history = useHistory();
    const classes = useAccountsStyles();

    const accountCardHeightPaper = classes.paper + ' ' + classes.accountCardHeight;
    const chartPaper = classes.paper + ' ' + classes.chart;

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

    const determineCurrencyIcon = (c: string) => {
        switch (c) {
            case 'EUR':
                return <Euro />;
            case 'USD':
                return <Dollar />;
            case 'GBP':
                return <Pound />;
            case 'BTC':
                return (
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
                        alt="..."
                        style={{ width: 32 }}
                    />
                );
        }
        return undefined;
    };

    const renderDialog = () => {
        return (
            <Dialog isOpen={openDialog} onClose={() => setOpenDialog(false)}>
                <List>
                    {currencies.map(c => (
                        <ListItem
                            button
                            key={c}
                            onClick={async () => {
                                try {
                                    const response = await createAccount({
                                        variables: {
                                            currency: c,
                                        },
                                        refetchQueries: [
                                            {
                                                query: AccountsDocument,
                                                variables: {},
                                            },
                                        ],
                                    });

                                    if (response && response.data) {
                                        console.log('Account successfully created!');
                                        setOpenDialog(false);
                                    }
                                } catch (error) {
                                    const errorMessage = error.message.split(':')[1];
                                    console.log(errorMessage);
                                }
                            }}
                        >
                            <ListItemIcon>
                                <div style={{ width: 32 }}>{determineCurrencyIcon(c)}</div>
                            </ListItemIcon>
                            <ListItemText primary={c} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        );
    };

    const handleAccountClicked = (e: MouseEvent<HTMLButtonElement>, account: any) => {
        e.preventDefault();
        history.push({
            pathname: `/accounts/${account.id}`,
            state: account,
        });
    };

    const simulate = () => {
        console.log('Simulating...');
    };

    const renderNoAccountsCard = () => {
        return (
            <>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper className={accountCardHeightPaper}>
                        <NoAccountsCard
                            onCreateNewAccountClicked={e => {
                                e.preventDefault();
                                setOpenDialog(true);
                            }}
                        />
                    </Paper>
                </Grid>
            </>
        );
    };

    return (
        <div className={classes.root}>
            {renderDialog()}
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <div
                        style={{
                            marginBottom: 12,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <Title title="Stats" fontSize={24} />
                        </div>
                        <div>
                            <ThemeProvider theme={theme}>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{
                                        fontWeight: 'bold',
                                        letterSpacing: 1,
                                        textTransform: 'none',
                                    }}
                                    onClick={() => simulate()}
                                >
                                    Simulate
                                </Button>
                            </ThemeProvider>
                        </div>
                    </div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={chartPaper}>
                                <Chart />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Container maxWidth="lg" className={classes.container}>
                    <div
                        style={{
                            marginBottom: 12,
                            marginTop: 12,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <Title title="Accounts" fontSize={24} />
                        </div>
                        <div
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            Total balance: £{totalBalance}
                        </div>
                    </div>
                    <Grid container spacing={3}>
                        {data.accounts.length > 0 &&
                            data.accounts.map(account => {
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
                                        currencyIcon = '$';
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
                                    <Grid key={account.id} item xs={12} md={4} lg={4}>
                                        <Paper className={accountCardHeightPaper}>
                                            <AccountsCard
                                                svg={svg}
                                                currencyIcon={currencyIcon}
                                                fullCurrencyText={fullCurrencyText}
                                                balance={account.balance}
                                                iban={account.iban}
                                                onAccountClicked={e =>
                                                    handleAccountClicked(e, account)
                                                }
                                            />
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        {data.accounts.length <= 2 && renderNoAccountsCard()}
                    </Grid>
                </Container>
            </main>
        </div>
    );
};
