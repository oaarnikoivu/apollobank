import React, { useState, MouseEvent, useEffect, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import {
    ThemeProvider,
    IconButton,
    Button,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SwapVert from '@material-ui/icons/SwapVert';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { ReactComponent as Euro } from '../../assets/world.svg';
import { ReactComponent as Dollar } from '../../assets/flag.svg';
import { ReactComponent as Pound } from '../../assets/uk.svg';
import { theme } from '../../utils/theme';
import { useAccountStyles } from './styles/Account.style';
import {
    useCreateTransactionMutation,
    useTransactionsQuery,
    TransactionsDocument,
    useAddMoneyMutation,
    useMeQuery,
    CreateTransactionMutation,
    CreateTransactionMutationVariables,
    AddMoneyMutation,
    AddMoneyMutationVariables,
    TransactionsQueryResult,
    MeQueryResult,
    useAccountQuery,
    ExchangeMutation,
    ExchangeMutationVariables,
    useExchangeMutation,
    AccountQueryResult,
} from '../../generated/graphql';
import { Dialog } from '../Dialog/Dialog';
import { FormTextField } from '../Forms/FormTextField';
import { Form, Formik } from 'formik';
import { Title } from '../Typography/Title';
import { MutationTuple } from '@apollo/react-hooks';
import { ExecutionResult } from 'graphql';
import { ExecutionResultDataDefault } from 'graphql/execution/execute';
import { Transactions } from '../Transactions/Transactions';
import { ErrorMessage, SuccessMessage } from '../Alerts/AlertMessage';
import { addMoneyValidationSchema } from '../../schemas /addMoneyValidationSchema';

const currencies: string[] = ['EUR', 'USD', 'GBP'];

export const Account: React.FC = () => {
    const location = useLocation<any>();
    const [toAccountCurrency, setToAccountCurrency] = useState<string>('');
    const [accountBalance, setAccountBalance] = useState<number>(0);
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
    const [openExchangeDialog, setOpenExchangeDialog] = useState<boolean>(false);
    const [openDetailsDialog, setOpenDetailsDialog] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    // GraphQL Mutations
    const [createTransaction]: MutationTuple<
        CreateTransactionMutation,
        CreateTransactionMutationVariables
    > = useCreateTransactionMutation();
    const [addMoney]: MutationTuple<
        AddMoneyMutation,
        AddMoneyMutationVariables
    > = useAddMoneyMutation();
    const [exchange]: MutationTuple<
        ExchangeMutation,
        ExchangeMutationVariables
    > = useExchangeMutation();

    // GraphQL Queries
    const user: MeQueryResult = useMeQuery();
    const account: AccountQueryResult = useAccountQuery({
        variables: { currency: location.state.currency },
    });
    const { data }: TransactionsQueryResult = useTransactionsQuery({
        variables: { currency: location.state.currency },
    });

    const classes = useAccountStyles();

    let currencyIcon: string = '';
    let currencyFullText: string = '';
    let svg: any | string;

    // On component mounts fetch the account balance
    useEffect(() => {
        if (account.data) {
            setAccountBalance(account.data.account.balance);
        } else {
            setAccountBalance(location.state.balance);
        }
    }, [account, location]);

    switch (location.state.currency) {
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

    const simulate = async (): Promise<void> => {
        try {
            const response: ExecutionResult<ExecutionResultDataDefault> = await createTransaction({
                variables: {
                    currency: location.state.currency,
                },
                refetchQueries: [
                    {
                        query: TransactionsDocument,
                        variables: {
                            currency: location.state.currency,
                        },
                    },
                ],
            });
            if (response && response.data) {
                // Update the account balance
                setAccountBalance(response.data.createTransaction);
            }
        } catch (error) {
            const errorMessage: string = error.message.split(':')[1];
            console.log(errorMessage);
        }
    };

    const renderAddDialog = () => {
        return (
            <Dialog isOpen={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <Title title="Add money" fontSize={18} />
                <div style={{ marginTop: 12 }}>
                    <Formik
                        initialValues={{ amount: 10 }}
                        validationSchema={addMoneyValidationSchema}
                        onSubmit={async (data, { setSubmitting, resetForm }) => {
                            setSubmitting(true);

                            try {
                                const response = await addMoney({
                                    variables: {
                                        amount: data.amount,
                                        currency: location.state.currency,
                                    },
                                });

                                if (response && response.data) {
                                    setSubmitting(false);
                                    setSuccessMessage('Successfully topped up your account');
                                    setOpenAddDialog(false);
                                    resetForm();
                                }
                            } catch (error) {
                                const errorMessage = error.message.split(':')[1];
                                setErrorMessage(errorMessage);
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <div>
                                <Form>
                                    <FormTextField
                                        name="amount"
                                        placeholder="amount"
                                        type="number"
                                    />
                                    <div>
                                        <ThemeProvider theme={theme}>
                                            <Button
                                                className={classes.dialogButton}
                                                disabled={isSubmitting}
                                                variant="contained"
                                                color="secondary"
                                                type="submit"
                                            >
                                                Add money
                                            </Button>
                                        </ThemeProvider>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </Dialog>
        );
    };

    const renderExchangeDialog = (): JSX.Element => {
        return (
            <Dialog isOpen={openExchangeDialog} onClose={() => setOpenExchangeDialog(false)}>
                <Title title="Exchange" fontSize={18} />
                <div style={{ marginTop: 12 }}>
                    <Formik
                        initialValues={{ amount: 10 }}
                        onSubmit={async (data, { setSubmitting, resetForm }) => {
                            setSubmitting(true);

                            try {
                                const response = await exchange({
                                    variables: {
                                        selectedAccountCurrency: location.state.currency,
                                        toAccountCurrency: toAccountCurrency,
                                        amount: data.amount,
                                    },
                                });

                                if (response && response.data) {
                                    // if the exchange was a success update the account balance and render a success message
                                    if (response.data.exchange.success) {
                                        setSubmitting(false);
                                        setSuccessMessage('The exchange was successfully executed');
                                        setOpenExchangeDialog(false);
                                        resetForm();
                                    }
                                }
                            } catch (error) {
                                const errorMessage = error.message.split('')[1];
                                setErrorMessage(errorMessage);

                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <div>
                                <Form>
                                    <FormTextField
                                        name="amount"
                                        placeholder="amount"
                                        type="number"
                                    />
                                    <FormControl style={{ marginLeft: 8 }} variant="outlined">
                                        <InputLabel id="select-filled-label">To</InputLabel>
                                        <Select
                                            labelId="select-filled-label"
                                            id="select-filled"
                                            value={toAccountCurrency}
                                            onChange={(event: ChangeEvent<{ value: unknown }>) => {
                                                setToAccountCurrency(event.target.value as string);
                                            }}
                                            label="To"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {currencies
                                                .filter(currency => {
                                                    return currency !== location.state.currency;
                                                })
                                                .map(currency => {
                                                    return (
                                                        <MenuItem value={currency}>
                                                            {currency}
                                                        </MenuItem>
                                                    );
                                                })}
                                        </Select>
                                    </FormControl>
                                    <div>
                                        <ThemeProvider theme={theme}>
                                            <Button
                                                className={classes.dialogButton}
                                                disabled={isSubmitting}
                                                variant="contained"
                                                color="secondary"
                                                type="submit"
                                            >
                                                Exchange
                                            </Button>
                                        </ThemeProvider>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </Dialog>
        );
    };

    const renderDetailsDialog = (): JSX.Element | undefined => {
        if (user && user.data && user.data.me) {
            return (
                <Dialog isOpen={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)}>
                    Beneficiary: {user.data.me.firstName} {user.data.me.lastName} <br />
                    IBAN: {location.state.iban} <br />
                    BIC: {location.state.bic}
                </Dialog>
            );
        }
    };

    const renderAlertMessage = (): JSX.Element | undefined => {
        if (successMessage.length > 0) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                    <SuccessMessage message={successMessage} />
                </div>
            );
        } else if (errorMessage.length > 0) {
            return (
                <div>
                    <ErrorMessage message={errorMessage} />
                </div>
            );
        }
    };

    return (
        <div className={classes.root}>
            {renderAddDialog()}
            {renderExchangeDialog()}
            {renderDetailsDialog()}
            {renderAlertMessage()}

            <div style={{ position: 'absolute', right: 20 }}>
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
            <div className={classes.accountBalance}>
                {currencyIcon}
                {accountBalance}
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
                <div>{location.state.currency}</div>
            </div>

            <div className={classes.accountButtonsSection}>
                <ThemeProvider theme={theme}>
                    <div>
                        <IconButton
                            className={classes.accountButton}
                            aria-label="Add"
                            onClick={e => {
                                e.preventDefault();
                                setOpenAddDialog(true);
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                        <div className={classes.accountButtonText}>Add money</div>
                    </div>
                    <div>
                        <IconButton
                            className={classes.accountButton}
                            aria-label="Exchange"
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                setOpenExchangeDialog(true);
                            }}
                        >
                            <SwapVert />
                        </IconButton>
                        <div className={classes.accountButtonText}>Exchange</div>
                    </div>
                    <div>
                        <IconButton
                            className={classes.accountButton}
                            aria-label="Details"
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                setOpenDetailsDialog(true);
                            }}
                        >
                            <InfoOutlinedIcon />
                        </IconButton>
                        <div className={classes.accountButtonText}>Details</div>
                    </div>
                </ThemeProvider>
            </div>
            <hr style={{ width: 480, marginTop: 24, color: '#fcfcfc' }} />
            <Transactions account={data} currencyIcon={currencyIcon} />
        </div>
    );
};
