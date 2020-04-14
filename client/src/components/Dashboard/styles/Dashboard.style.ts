import { makeStyles } from '@material-ui/core';

export const useDashboardStyles = makeStyles(theme => ({
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
