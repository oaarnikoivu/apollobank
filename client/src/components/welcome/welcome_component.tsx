import React from 'react';
import { Landing } from '../landing/landing_component';

//import { WelcomeButton, WelcomeText } from './welcome.style';
// import { Account } from '../../models/account';
// import { fetchAccounts } from '../../actions/accounts';
// import { Routes } from '../../routes/routes';

export const WelcomePage: React.FC = () => {
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
            <Landing />
        </>
    );
};
