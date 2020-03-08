import { makeStyles } from '@material-ui/core/styles';

export const useRegisterStyles = makeStyles({
    headerText: {
        textAlign: 'center',
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '420px',
        margin: '0 auto',
    },
    alignedFormContent: {
        marginTop: 12,
        display: 'flex',
        width: '100%',
    },
    alignedFormField: {
        width: '50%',
        marginRight: 8,
    },
    formField: {
        width: '411px',
        marginRight: 8,
        marginTop: 12,
    },
    formButton: {
        marginTop: 12,
        textAlign: 'center',
    },
    loginText: {
        margintop: 12,
    },
});
