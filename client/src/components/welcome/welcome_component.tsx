import React from 'react';
import { WelcomePageProps } from './welcome_interfaces';
import { WelcomeButton, WelcomeText, Container } from './welcome.style';
import { Landing } from '../landing/landing_component';
import { fetchAccounts } from '../../actions/accounts';
import { Link } from 'react-router-dom';

export const WelcomePage: React.FC<WelcomePageProps> = (props: WelcomePageProps) => {
    const renderExistingUserWelcome = (): JSX.Element => {
        return (
            <>
                <WelcomeText>Hello {props.username.toUpperCase()}</WelcomeText>
                <Link to="/accounts">
                    <WelcomeButton
                        onClick={() => {
                            fetchAccounts().then(accounts => console.log(accounts));
                        }}
                    >
                        Access my accounts
                    </WelcomeButton>
                </Link>
            </>
        );
    };

    const renderNewUserWelcome = (): JSX.Element => {
        return (
            <>
                <Landing />
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
