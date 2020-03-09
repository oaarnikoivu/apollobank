import React, { MouseEvent, useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Paper,
    makeStyles,
    Typography,
    Divider,
    IconButton,
} from '@material-ui/core';
import { Chart } from '../Charts/Chart';
import { Title } from '../Typography/Title';
import { ReactComponent as Euro } from '../../assets/world.svg';
import { ReactComponent as Dollar } from '../../assets/flag.svg';
import { ReactComponent as Pound } from '../../assets/uk.svg';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useAccountsQuery } from '../../generated/graphql';
import { Loading } from '../Loading/Loading';
import { Currency } from '../../utils/currencies';
import { useHistory } from 'react-router-dom';
import { ColorScheme } from '../../utils/theme';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        fontWeight: 'bold',
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        borderRadius: 8,
    },
    fixedHeight: {
        height: 240,
    },
    accountCardHeight: {
        height: 172,
    },
    chart: {
        height: '100%',
    },
}));

export const Accounts: React.FC = () => {
    const { data, loading } = useAccountsQuery();
    const [totalBalance, setTotalBalance] = useState(0);
    const history = useHistory();
    const classes = useStyles();

    const accountCardHeightPaper = classes.paper + ' ' + classes.accountCardHeight;
    const chartPaper = classes.paper + ' ' + classes.chart;

    useEffect(() => {
        let balance = 0;
        if (data) {
            data.accounts.forEach(account => {
                balance += account.balance;
            });
        }
        setTotalBalance(balance);
    }, [loading, data]);

    if (!data) {
        return <Loading />;
    }

    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <div style={{ marginBottom: 12 }}>
                        <Title title="Stats" fontSize={24} />
                    </div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={chartPaper}>
                                <Chart />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Container maxWidth="lg" className={classes.container}>
                    <div
                        style={{
                            marginBottom: 12,
                            marginTop: 12,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <Title title="Accounts" fontSize={24} />
                        </div>
                        <div
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: 'rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            Total balance: £{totalBalance}
                        </div>
                    </div>
                    <Grid container spacing={3}>
                        {data.accounts.map(account => {
                            let svg: any | string;
                            let currencyIcon: string = '';
                            let fullCurrencyText: string = '';

                            switch (account.currency) {
                                case Currency.EURO:
                                    svg = <Euro />;
                                    currencyIcon = '€';
                                    fullCurrencyText = 'Euro';
                                    break;
                                case Currency.DOLLAR:
                                    svg = <Dollar />;
                                    currencyIcon = '＄';
                                    fullCurrencyText = 'US Dollar';
                                    break;
                                case Currency.POUND:
                                    svg = <Pound />;
                                    currencyIcon = '£';
                                    fullCurrencyText = 'British Pound';
                                    break;
                                case Currency.BITCOIN:
                                    svg = '';
                                    currencyIcon = '฿';
                                    fullCurrencyText = 'Bitcoin';
                                    break;
                            }

                            return (
                                <Grid key={account.id} item xs={12} md={4} lg={4}>
                                    <Paper className={accountCardHeightPaper}>
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
                                                <IconButton
                                                    style={{ color: ColorScheme.PRIMARY }}
                                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                        e.preventDefault();
                                                        history.push({
                                                            pathname: `/accounts/${account.id}`,
                                                            state: account,
                                                        });
                                                    }}
                                                >
                                                    <NavigateNextIcon fontSize="small" />
                                                </IconButton>
                                            </div>
                                        </div>
                                        <Typography
                                            style={{ margin: '0 auto', marginTop: '24px' }}
                                            component="p"
                                            variant="h4"
                                        >
                                            {currencyIcon}
                                            {account.balance}
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
                                            XXXX APL0 0099 YYYY ZZZZ 78
                                        </Typography>
                                    </Paper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Container>
            </main>
        </div>
    );
};
