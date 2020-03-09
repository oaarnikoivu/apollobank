import { makeStyles } from '@material-ui/core';
export const useAccountsStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        textalign: 'center',
        flexDirection: 'column',
    },
    newAccountButton: {
        position: 'absolute',
        right: 20,
        marginTop: 10,
    },
    accountInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 15,
    },
    accountList: {
        marginTop: 8,
    },
});
