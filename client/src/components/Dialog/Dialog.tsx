import React from 'react';

let dialogStyles: React.CSSProperties = {
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
};

let dialogCloseButtonStyles: React.CSSProperties = {
    marginBottom: '15px',
    padding: '3px 8px',
    cursor: 'pointer',
    borderRadius: '50%',
    border: 'none',
    width: '30px',
    height: '30px',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
};

interface NewAccountDialogProps {
    isOpen: boolean;
    onClose: any;
}

export const Dialog: React.FC<NewAccountDialogProps> = ({ children, isOpen, onClose }) => {
    let dialog: JSX.Element | undefined = (
        <div style={dialogStyles}>
            <button style={dialogCloseButtonStyles} onClick={onClose}>
                x
            </button>
            Dialog
        </div>
    );

    if (!isOpen) {
        dialog = undefined;
    }
    return <div>{dialog}</div>;
};
