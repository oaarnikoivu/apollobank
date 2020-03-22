import React from 'react';
import { createUseStyles } from 'react-jss';

const useDialogStyles = createUseStyles({
    dialog: {
        width: '500px',
        maxWidth: '100%',
        margin: '0 auto',
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
        backgroundColor: '#eee',
        padding: '10px 20px 40px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
    },
    closeButton: {
        marginBottom: '15px',
        padding: '3px 8px',
        cursor: 'pointer',
        borderRadius: '50%',
        border: 'none',
        width: '30px',
        height: '30px',
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    },
});

interface DialogProps {
    isOpen: boolean;
    onClose: any;
}

export const Dialog: React.FC<DialogProps> = ({ children, isOpen, onClose }) => {
    const classes = useDialogStyles();

    let dialog: JSX.Element | undefined = (
        <div className={classes.dialog}>
            <button className={classes.closeButton} onClick={onClose}>
                x
            </button>
            {children}
        </div>
    );

    if (!isOpen) {
        dialog = undefined;
    }
    return <div>{dialog}</div>;
};
