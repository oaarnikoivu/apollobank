import React, { MouseEvent } from 'react';
import { IconButton, Typography, Divider } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Title } from '../Typography/Title';
import { ColorScheme } from '../../utils/theme';

interface AccountsCardProps {
    svg: any | string;
    currencyIcon: string;
    fullCurrencyText: string;
    balance: number;
    iban: string;
    onAccountClicked(e: MouseEvent<HTMLButtonElement>): void;
}

export const AccountsCard: React.FC<AccountsCardProps> = ({
    svg,
    currencyIcon,
    fullCurrencyText,
    balance,
    iban,
    onAccountClicked,
}) => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div style={{ width: 32 }}>
                    {!!svg ? (
                        svg
                    ) : (
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
                            alt="..."
                            style={{ width: 32 }}
                        />
                    )}
                </div>
                <Title title={fullCurrencyText} fontSize={18} />
                <div>
                    <IconButton style={{ color: ColorScheme.PRIMARY }} onClick={onAccountClicked}>
                        <NavigateNextIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>
            <Typography style={{ margin: '0 auto', marginTop: '24px' }} component="p" variant="h4">
                {currencyIcon}
                {balance}
            </Typography>
            <Divider style={{ marginTop: 24 }} light />
            <Typography
                style={{
                    marginTop: '14px',
                    letterSpacing: 1,
                    color: 'rgba(0, 0, 0, 0.3)',
                }}
                component="p"
            >
                {!!iban ? iban : 'XXXX APL0 0099 YYYY ZZZZ 78'}
            </Typography>
        </>
    );
};

export const NoAccountsCard: React.FC = () => {
    return <div>Create new account</div>;
};
