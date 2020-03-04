import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const Account: React.FC = () => {
    const history = useHistory();
    const [accountData, setAccountData] = useState<any>({});

    useEffect(() => {
        const data = history.location.state as any;
        setAccountData(data);
    }, [history.location.state]);

    return (
        <>
            <div>Account</div>
            <div>
                <li>Currency: {accountData.currency}</li>
                <li>Balance: {accountData.balance}</li>
            </div>
        </>
    );
};
