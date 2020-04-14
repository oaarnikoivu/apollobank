import React, { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import {
    Container,
    Grid,
    Paper,
    List,
    ListItemText,
    ListItem,
    ListItemIcon,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ThemeProvider,
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
    useCreateCardMutation,
    useCardsQuery,
    CardsDocument,
    AccountsQueryResult,
    CardsQueryResult,
    CreateAccountMutation,
    CreateAccountMutationVariables,
    CreateCardMutation,
    CreateCardMutationVariables,
    Account,
} from '../../generated/graphql';
import { Loading } from '../Loading/Loading';
import { useHistory } from 'react-router-dom';
import { AccountsCard, NoAccountsCard } from '../cards/AccountsCard';
import { Currency } from '../../utils/currencies';
import { Dialog } from '../Dialog/Dialog';
import { NoApolloCard, ApolloCard } from '../cards/ApolloCard';
import { MutationTuple } from '@apollo/react-hooks';
import { ExecutionResult } from 'graphql';
import { theme } from '../../utils/theme';
import { useDashboardStyles } from './styles/Dashboard.style';

const GLOBAL_CURRENCIES: string[] = ['EUR', 'USD', 'GBP'];

export const Dashboard: React.FC = () => {
    const { data, loading }: AccountsQueryResult = useAccountsQuery();
    const cards: CardsQueryResult = useCardsQuery();
    const [createAccount]: MutationTuple<
        CreateAccountMutation,
        CreateAccountMutationVariables
    > = useCreateAccountMutation();
    const [createCard]: MutationTuple<
        CreateCardMutation,
        CreateCardMutationVariables
    > = useCreateCardMutation();

    const [currencies, setCurrencies] = useState<string[]>(['']);
    const [analyticsAccount, setAnalyticsAccount] = useState<string>('');
    const [totalBalance, setTotalBalance] = useState<number>(0);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const history = useHistory();

    const classes = useDashboardStyles();

    const accountCardHeightPaper = classes.paper + ' ' + classes.accountCardHeight;
    const chartPaper = classes.paper + ' ' + classes.chart;

    useEffect(() => {
        let currencies: string[] = [];
        let balance: number = 0;
        if (data) {
            data.accounts.forEach((account: Account) => {
                balance += account.balance;
                currencies.push(account.currency);
            });
        }
        setTotalBalance(balance);
        setCurrencies(currencies);
    }, [loading, data]);

    useEffect(() => {
        if (currencies.length > 0) {
            setAnalyticsAccount(currencies[0]);
        }
    }, [currencies]);

    if (!data) {
        return <Loading />;
    }

    const determineCurrencyIcon = (c: string): JSX.Element | undefined => {
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

    const renderDialog = (): JSX.Element => {
        return (
            <Dialog isOpen={openDialog} onClose={() => setOpenDialog(false)}>
                <List>
                    {GLOBAL_CURRENCIES.map((currency: string, index: number) => (
                        <ListItem
                            button
                            key={currency}
                            onClick={async () => {
                                try {
                                    const response: ExecutionResult<CreateAccountMutation> = await createAccount(
                                        {
                                            variables: {
                                                currency: currency,
                                            },
                                            refetchQueries: [
                                                {
                                                    query: AccountsDocument,
                                                    variables: {},
                                                },
                                                {
                                                    query: CardsDocument,
                                                    variables: {},
                                                },
                                            ],
                                        },
                                    );

                                    if (response && response.data) {
                                        setAnalyticsAccount(currency);
                                        setOpenDialog(false);
                                    }
                                } catch (error) {
                                    const errorMessage: string = error.message.split(':')[1];
                                    console.log(errorMessage);
                                }
                            }}
                        >
                            <ListItemIcon>
                                <div style={{ width: 32 }}>{determineCurrencyIcon(currency)}</div>
                            </ListItemIcon>
                            <ListItemText primary={currency} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        );
    };

    const handleAccountClicked = (e: MouseEvent<HTMLButtonElement>, account: Account): void => {
        e.preventDefault();
        history.push({
            pathname: `/accounts/${account.id}`,
            state: account,
        });
    };

    const handleCreateNewCardClicked = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();

        try {
            const response: ExecutionResult<CreateCardMutation> = await createCard({
                variables: {},
                refetchQueries: [
                    {
                        query: CardsDocument,
                        variables: {},
                    },
                ],
            });

            if (response && response.data) {
                console.log('Card successfully created!');
            }
        } catch (error) {
            const errorMessage: string = error.message.split(':')[1];
            console.log(errorMessage);
        }
    };

    const renderNoAccountsCard = (): JSX.Element => {
        return (
            <>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper className={accountCardHeightPaper}>
                        <NoAccountsCard
                            onCreateNewAccountClicked={(e: MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                setOpenDialog(true);
                            }}
                        />
                    </Paper>
                </Grid>
            </>
        );
    };

    const renderNoApolloCard = (): JSX.Element => {
        return (
            <>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper className={accountCardHeightPaper}>
                        <NoApolloCard
                            onCreateNewCardClicked={(e: MouseEvent<HTMLButtonElement>) => {
                                handleCreateNewCardClicked(e);
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
                            <Title title="Analytics" fontSize={24} />
                        </div>
                    </div>
                    <ThemeProvider theme={theme}>
                        <FormControl>
                            <InputLabel id="select-filled-label">Account</InputLabel>
                            <Select
                                labelId="select-filled-label"
                                id="select-filled"
                                value={analyticsAccount}
                                onChange={(event: ChangeEvent<{ value: unknown }>) =>
                                    setAnalyticsAccount(event.target.value as string)
                                }
                                label="Account"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {currencies.map(currency => {
                                    return (
                                        <MenuItem key={currency} value={currency}>
                                            {currency}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </ThemeProvider>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={chartPaper}>
                                <Chart currency={!!analyticsAccount ? analyticsAccount : 'EUR'} />
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
                                                onAccountClicked={(
                                                    e: MouseEvent<HTMLButtonElement>,
                                                ) => handleAccountClicked(e, account)}
                                            />
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        {data.accounts.length <= 2 && renderNoAccountsCard()}
                    </Grid>
                </Container>
                <Container maxWidth="lg" className={classes.container}>
                    <div style={{ marginBottom: 12 }}>
                        <Title title="Cards" fontSize={24} />
                    </div>
                    <Grid container spacing={3}>
                        {cards.data &&
                            cards.data.cards &&
                            cards.data.cards.length > 0 &&
                            cards.data.cards.map(card => {
                                return (
                                    <Grid key={card.id} item xs={12} md={4} lg={4}>
                                        <Paper className={accountCardHeightPaper}>
                                            <ApolloCard
                                                cardNumber={card.cardNumber}
                                                validThru={
                                                    new Date(
                                                        Date.parse(card.expiresIn),
                                                    ).getMonth() +
                                                    '/' +
                                                    new Date(Date.parse(card.expiresIn))
                                                        .getFullYear()
                                                        .toString()
                                                        .substr(-2)
                                                }
                                                cvv={card.cvv}
                                            />
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        {cards.data && cards.data.cards.length <= 2 && renderNoApolloCard()}
                    </Grid>
                </Container>
            </main>
        </div>
    );
};
