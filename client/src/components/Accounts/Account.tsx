import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeProvider, IconButton, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SwapVert from '@material-ui/icons/SwapVert';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { ReactComponent as Euro } from '../../assets/world.svg';
import { ReactComponent as Dollar } from '../../assets/flag.svg';
import { ReactComponent as Pound } from '../../assets/uk.svg';
import { theme } from '../../utils/theme';
import { useAccountStyles } from './styles/Account.style';
import { TransactionCard } from '../Cards/TransactionCard';
import { Loading } from '../Loading/Loading';
import {
    useCreateTransactionMutation,
    useTransactionsQuery,
    TransactionsDocument,
    TransactionsQuery,
    useAddMoneyMutation,
    useMeQuery,
} from '../../generated/graphql';
import { Dialog } from '../Dialog/Dialog';
import { FormTextField } from '../Forms/FormTextField';
import { Form, Formik } from 'formik';
import { Title } from '../Typography/Title';

interface TransactionProps {
    data: TransactionsQuery | undefined;
    currencyIcon?: string;
}

const Transactions: React.FC<TransactionProps> = ({ data, currencyIcon }) => {
    const classes = useAccountStyles();

    if (!data) {
        return <Loading />;
    }

    return (
        <div>
            <div className={classes.transactions}>
                <div className={classes.transactionsHeader}></div>
                <div className={classes.transactionCards}>
                    {data.transactions.length > 0 &&
                        data.transactions.map((transaction: any, index: number) => {
                            return (
                                <TransactionCard
                                    key={index}
                                    title={transaction.transactionType}
                                    time={new Date(
                                        Date.parse(transaction.date),
                                    ).toLocaleDateString()}
                                    card={6254}
                                    fee={0}
                                    amount={transaction.amount}
                                    currencyIcon={currencyIcon}
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
    const [createTransaction] = useCreateTransactionMutation();
    const [addMoney] = useAddMoneyMutation();
    const { data } = useTransactionsQuery({
        variables: { currency: history.location.state.currency },
    });
    const user = useMeQuery();

    const [accountBalance, setAccountBalance] = useState(0);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openExchangeDialog, setOpenExchangeDialog] = useState(false);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const classes = useAccountStyles();

    let currencyIcon: string = '';
    let currencyFullText: string = '';
    let svg: any | string;

    useEffect(() => {
        setAccountBalance(history.location.state.balance);
    }, [history]);

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

    const simulate = async () => {
        try {
            const response = await createTransaction({
                variables: { currency: history.location.state.currency },
                refetchQueries: [
                    {
                        query: TransactionsDocument,
                        variables: { currency: history.location.state.currency },
                    },
                ],
            });

            if (response && response.data) {
                console.log(response.data);
            }
        } catch (error) {
            const errorMessage = error.message.split(':')[1];
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
                                        currency: history.location.state.currency,
                                    },
                                });

                                if (response && response.data) {
                                    setSubmitting(false);
                                    setAccountBalance(response.data.addMoney);
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

    const renderExchangeDialog = () => {
        return (
            <Dialog isOpen={openExchangeDialog} onClose={() => setOpenExchangeDialog(false)}>
                Exchange
            </Dialog>
        );
    };

    const renderDetailsDialog = () => {
        if (user && user.data && user.data.me) {
            return (
                <Dialog isOpen={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)}>
                    Beneficiary: {user.data.me.firstName} {user.data.me.lastName}
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
                <div>{history.location.state.currency}</div>
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
                            onClick={e => {
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
                            onClick={e => {
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
            <Transactions data={data} currencyIcon={currencyIcon} />
        </div>
    );
};
