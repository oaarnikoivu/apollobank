import React from 'react';
import { WelcomePageProps } from './welcome_interfaces';
import { WelcomeButton, WelcomeText, Container } from './welcome.style';
import { Landing } from '../landing/landing_component';
import { Account } from '../../models/account';
import { fetchAccounts } from '../../actions/accounts';
import { Routes } from '../../routes/apiRoutes';

export const WelcomePage: React.FC<WelcomePageProps> = (props: WelcomePageProps) => {
    const renderExistingUserWelcome = (): JSX.Element => {
        return (
            <>
                <WelcomeText>Hello {'Oliver'.toUpperCase()}</WelcomeText>
                <WelcomeButton
                    onClick={() => {
                        fetchAccounts().then((accounts: Account[]) => {
                            props.history.push({
                                pathname: Routes.ACCOUNTS,
                                state: accounts,
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
