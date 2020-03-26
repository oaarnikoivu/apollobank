import React from 'react';
import {
    CardsQueryResult,
    useCardsQuery,
    TransactionsQuery,
    Transaction,
} from '../../generated/graphql';
import { useAccountStyles } from '../Accounts/styles/Account.style';
import { Loading } from '../Loading/Loading';
import { TransactionCard } from '../cards/TransactionCard';

interface TransactionProps {
    account: TransactionsQuery | undefined;
    currencyIcon?: string;
}

export const Transactions: React.FC<TransactionProps> = ({ account, currencyIcon }) => {
    const { data }: CardsQueryResult = useCardsQuery();
    const classes = useAccountStyles();

    if (!account) {
        return <Loading />;
    }

    return (
        <div>
            <div className={classes.transactions}>
                <div className={classes.transactionsHeader}></div>
                <div className={classes.transactionCards}>
                    {account.transactions.length > 0 &&
                        account.transactions.map((transaction: Transaction) => {
                            return (
                                <TransactionCard
                                    key={transaction.id}
                                    title={transaction.transactionType}
                                    time={new Date(
                                        Date.parse(transaction.date),
                                    ).toLocaleDateString()}
                                    card={!!data ? data.cards[0].cardNumber : undefined}
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
