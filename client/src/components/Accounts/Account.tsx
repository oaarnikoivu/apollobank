import React, { useState, MouseEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeProvider, IconButton, Button } from '@material-ui/core';
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
} from '../../generated/graphql';
import { Dialog } from '../Dialog/Dialog';
import { FormTextField } from '../Forms/FormTextField';
import { Form, Formik } from 'formik';
import { Title } from '../Typography/Title';
import { MutationTuple } from '@apollo/react-hooks';
import { ExecutionResult } from 'graphql';
import { ExecutionResultDataDefault } from 'graphql/execution/execute';
import { Transactions } from '../Transactions/Transactions';

export const Account: React.FC = () => {
    const location = useLocation<any>();
    const [createTransaction]: MutationTuple<
        CreateTransactionMutation,
        CreateTransactionMutationVariables
    > = useCreateTransactionMutation();
    const [addMoney]: MutationTuple<
        AddMoneyMutation,
        AddMoneyMutationVariables
    > = useAddMoneyMutation();

    const user: MeQueryResult = useMeQuery();

    const account = useAccountQuery({
        variables: { currency: location.state.currency },
    });

    const { data }: TransactionsQueryResult = useTransactionsQuery({
        variables: { currency: location.state.currency },
    });

    const [accountBalance, setAccountBalance] = useState<number>(0);
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
    const [openExchangeDialog, setOpenExchangeDialog] = useState<boolean>(false);
    const [openDetailsDialog, setOpenDetailsDialog] = useState<boolean>(false);

    const classes = useAccountStyles();

    let currencyIcon: string = '';
    let currencyFullText: string = '';
    let svg: any | string;

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
                        initialValues={{ amount: '' }}
                        onSubmit={async (data, { setSubmitting, resetForm }) => {
                            setSubmitting(true);

                            try {
                                const response = await addMoney({
                                    variables: {
                                        amount: parseInt(data.amount),
                                        currency: location.state.currency,
                                    },
                                });

                                if (response && response.data) {
                                    setSubmitting(false);
                                    setOpenAddDialog(false);
                                    resetForm();
                                }
                            } catch (error) {
                                const errorMessage = error.message.split(':')[1];
                                console.log(errorMessage);
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
                Exchange
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

    return (
        <div className={classes.root}>
            {renderAddDialog()}
            {renderExchangeDialog()}
            {renderDetailsDialog()}

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
