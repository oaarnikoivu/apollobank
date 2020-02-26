import React from 'react';
import { WelcomePageProps } from './welcome_interfaces';
import { Landing } from '../landing/landing_component';
import { Container } from './welcome.style';
//import { WelcomeButton, WelcomeText } from './welcome.style';
// import { Account } from '../../models/account';
// import { fetchAccounts } from '../../actions/accounts';
// import { Routes } from '../../routes/routes';

export const WelcomePage: React.FC<WelcomePageProps> = (props: WelcomePageProps) => {
    // const renderExistingUserWelcome = (): JSX.Element => {
    //     return (
    //         <>
    //             <WelcomeText>Hello {'Oliver'.toUpperCase()}</WelcomeText>
    //             <WelcomeButton
    //                 onClick={() => {
    //                     fetchAccounts().then((accounts: Account[]) => {
    //                         props.history.push({
    //                             pathname: Routes.ACCOUNTS,
    //                             state: accounts,
    //                         });
    //                     });
    //                 }}
    //             >
    //                 Access my accounts
    //             </WelcomeButton>
    //         </>
    //     );
    // };

    return (
        <>
            <Container>
                <Landing />
            </Container>
        </>
    );
};
