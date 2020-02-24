import React from 'react';
import { WelcomePageProps } from './welcome_interfaces';
import { WelcomeButton, WelcomeText, Container } from './welcome.style';
import { Landing } from '../landing/landing_component';
import { fetchAccounts } from '../../actions/accounts';

export const WelcomePage: React.FC<WelcomePageProps> = (props: WelcomePageProps) => {
    const renderExistingUserWelcome = (): JSX.Element => {
        return (
            <>
                <WelcomeText>Welcome back {props.username.toUpperCase()}</WelcomeText>
                <WelcomeButton
                    onClick={_ => {
                        fetchAccounts().then(accounts => console.log(accounts));
                    }}
                >
                    Access my accounts
                </WelcomeButton>
            </>
        );
    };

    const renderNewUserWelcome = (): JSX.Element => {
        return (
            <>
                <Landing />
                {/* <div className={''}>Welcome to Express!</div> */}
            </>
        );
    };

    return (
        <>
            <Container>
                {!!props.hasAccount ? renderExistingUserWelcome() : renderNewUserWelcome()}
            </Container>
        </>
    );
};
