import React from 'react';
import { WelcomePageProps } from './welcome_interfaces';
import { WelcomeButton, WelcomeText, Container } from './welcome.style';
import { Landing } from '../landing/landing_component';
import { fetchAccounts } from '../../actions/accounts';
import { Routes } from '../../routes/apiRoutes';

export const WelcomePage: React.FC<WelcomePageProps> = (props: WelcomePageProps) => {
    const renderExistingUserWelcome = (): JSX.Element => {
        return (
            <>
                <WelcomeText>Hello {'Oliver'.toUpperCase()}</WelcomeText>
                <WelcomeButton
                    onClick={() => {
                        fetchAccounts().then(accounts => {
                            props.history.push({
                                pathname: Routes.ACCOUNTS,
                                state: {
                                    owner: accounts.owner,
                                    currency: accounts.currency,
                                    balance: accounts.balance,
                                },
                            });
                        });
                    }}
                >
                    Access my accounts
                </WelcomeButton>
            </>
        );
    };

    return (
        <>
            <Container>{!props.hasAccount ? renderExistingUserWelcome() : <Landing />}</Container>
        </>
    );
};
