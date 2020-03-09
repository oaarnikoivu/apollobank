import { makeStyles } from '@material-ui/core/styles';

export const useAccountCardStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    icon: {
        position: 'absolute',
        left: 40,
        width: 32,
    },
    card: {
        marginTop: 8,
        width: 480,
        height: 84,
        borderTop: 'none',
        borderRight: 'none',
        borderLeft: 'none',
        borderRadius: 0,
    },
    cardBalance: {
        color: 'black',
    },
    cardCurrency: {
        color: 'black',
        textTransform: 'none',
    },
});
