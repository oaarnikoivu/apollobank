import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Account } from '../../models/account';
import { Container, Header, CurrencyContainer } from './accounts.style';

interface Props extends RouteComponentProps {}

export const Accounts: React.FC<Props> = ({ history }) => {
    let accounts = history.location.state as Account[];

    return (
        <>
            <Container>
                <Header>Accounts</Header>
                <CurrencyContainer>
                    {accounts.map((account: Account, index: number) => {
                        return (
                            <li key={index}>
                                {account.currency} --- {account.balance}
                            </li>
                        );
                    })}
                </CurrencyContainer>
            </Container>
        </>
    );
};
