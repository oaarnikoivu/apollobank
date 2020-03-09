import { makeStyles } from '@material-ui/core/styles';

export const useRegisterStyles = makeStyles({
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
    alignedFormContent: {
        marginTop: 12,
        display: 'flex',
        width: '100%',
    },
    alignedFormField: {
        width: '50%',
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
    loginText: {
        margintop: 12,
    },
    spacer: {
        width: 8,
    },
});
