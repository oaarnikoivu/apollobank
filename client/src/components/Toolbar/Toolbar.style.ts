import { createUseStyles } from 'react-jss';

export const useToolbarStyles = createUseStyles({
    toolbar: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '56px',
        backgroundColor: 'blue',
    },
    navigation: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        padding: '0 1rem',
    },
    logo: {
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginLeft: '1.5rem',
        '& a': {
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.5rem',
        },
    },
    toggleButton: {},
    navigationItems: {
        '& ul': {
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
        },
        '& li': {
            padding: '0 0.5rem',
        },
        '& a': {
            color: 'white',
            textDecoration: 'none',
        },
        '& a:hover': {
            color: 'orange',
        },
        '& a:active': {
            color: 'orange',
        },
    },
    spacer: {
        flex: 1,
    },
    '@media (max-width: 768px)': {
        navigationItems: {
            display: 'none',
        },
    },
    '@media (min-width: 769px)': {
        toggleButton: {
            display: 'none',
        },
        logo: {
            marginLeft: 0,
        },
    },
});
