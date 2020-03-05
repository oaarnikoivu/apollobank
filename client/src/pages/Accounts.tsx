import React from 'react';
import { useAccountsQuery } from '../generated/graphql';

export const Accounts: React.FC = () => {
    const { data } = useAccountsQuery();

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>Accounts:</div>
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
    );
};
