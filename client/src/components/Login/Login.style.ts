import { makeStyles } from '@material-ui/core/styles';

export const useLoginStyles = makeStyles({
    root: {
        margin: '0 auto',
        top: '25%',
        height: '100%',
        width: '348px',
    },
    headerText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    formField: {
        width: '100%',
        marginTop: 12,
    },
    formButton: {
        marginTop: 12,
        textTransform: 'none',
        fontWeight: 'bold',
        letterSpacing: 1,
        textAlign: 'center',
    },
    registerText: {
        marginTop: 12,
    },
});
