import React from 'react';
import { WelcomePageProps } from './welcome_interfaces';
import { WelcomeButton, WelcomeText, Container } from './welcome.style';

export const WelcomePage: React.FC<WelcomePageProps> = (props: WelcomePageProps) => {
    const renderExistingUserWelcome = (): JSX.Element => {
        return (
            <>
                <WelcomeText>Hello {props.username.toUpperCase()}</WelcomeText>
                <WelcomeButton onClick={_ => console.log('Clicked!')}>
                    Access my accounts
                </WelcomeButton>
            </>
        );
    };

    const renderNewUserWelcome = (): JSX.Element => {
        return <div className={''}>Welcome to Express!</div>;
    };

    return (
        <>
            <Container>
                {!!props.hasAccount ? renderExistingUserWelcome() : renderNewUserWelcome()}
            </Container>
        </>
    );
};
