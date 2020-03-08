import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Container,
    makeStyles,
    Typography,
    Button,
    ThemeProvider,
    CardActionArea,
} from '@material-ui/core';
import { ReactComponent as MasterCard } from '../assets/mc_symbol.svg';
import { theme } from '../utils/theme';

const useStyles = makeStyles({
    card: {
        height: '168px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 8,
    },
});

const cards = [1, 2, 3];
const services = ['Transactions', 'Exchange', 'Statistics', 'Trading'];

const Cards = (): JSX.Element => {
    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ letterSpacing: 4 }}>Cards</div>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" color="secondary">
                        View all cards
                    </Button>
                </ThemeProvider>
            </div>
            <Grid style={{ marginTop: 4 }} container spacing={4}>
                {cards.map(card => {
                    return (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography component="h5">Available balance</Typography>
                                    <Typography component="h5">£2000</Typography>
                                    <Typography
                                        style={{ marginTop: 32, letterSpacing: 2 }}
                                        component="h5"
                                    >
                                        **** **** **** **34
                                    </Typography>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography style={{ marginTop: 12 }} component="h5">
                                            AP
                                        </Typography>
                                        <div style={{ width: 64 }}>
                                            <MasterCard />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

const Services = () => {
    return (
        <Container maxWidth="md">
            <div style={{ letterSpacing: 4 }}>Main Services</div>
            <Grid style={{ marginTop: 4 }} container spacing={4}>
                {services.map(service => {
                    return (
                        <Grid item key={service} xs={12} sm={4} md={3}>
                            <ThemeProvider theme={theme}>
                                <Card style={{ height: 80 }}>
                                    <CardActionArea
                                        style={{ height: 80, display: 'flex', fontSize: 14 }}
                                    >
                                        {service}
                                    </CardActionArea>
                                </Card>
                            </ThemeProvider>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

const Analytics = () => {
    return (
        <Container maxWidth="md">
            <div style={{ letterSpacing: 4 }}>Analytics</div>
        </Container>
    );
};

export const Dashboard: React.FC = () => {
    return (
        <div>
            <div style={{ marginTop: 24 }}>
                <Cards />
            </div>
            <div style={{ marginTop: 24 }}>
                <Services />
            </div>
            <div style={{ marginTop: 24 }}>
                <Analytics />
            </div>
        </div>
    );
};
