import React, { MouseEvent } from './node_modules/react';
import {
    IconButton,
    Typography,
    Divider,
    Button,
    ThemeProvider,
} from './node_modules/@material-ui/core';
import NavigateNextIcon from './node_modules/@material-ui/icons/NavigateNext';
import AddIcon from './node_modules/@material-ui/icons/Add';
import { Title } from '../Typography/Title';
import { ColorScheme, theme } from '../../utils/theme';

interface AccountsCardProps {
    svg: any | string;
    currencyIcon: string;
    fullCurrencyText: string;
    balance: number;
    iban: string;
    onAccountClicked(e: MouseEvent<HTMLButtonElement>): void;
}

interface NoAccountCardProps {
    onCreateNewAccountClicked(e: MouseEvent<HTMLButtonElement>): void;
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

export const NoAccountsCard: React.FC<NoAccountCardProps> = ({ onCreateNewAccountClicked }) => {
    return (
        <div
            style={{
                display: 'flex',
                marginTop: '62px',
                justifyContent: 'center',
            }}
        >
            <ThemeProvider theme={theme}>
                <Button
                    style={{ fontWeight: 'bold', textTransform: 'none', letterSpacing: 1 }}
                    color="primary"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onCreateNewAccountClicked}
                >
                    Create new account
                </Button>
            </ThemeProvider>
        </div>
    );
};
