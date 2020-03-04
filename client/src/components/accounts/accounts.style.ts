import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        minWidth: 420,
        marginTop: 12,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
    },
    pos: {
        marginBottom: 12,
    },
});
