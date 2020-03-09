import { createUseStyles } from 'react-jss';

export const useSideDrawerStyles = createUseStyles({
    siderDrawer: {
        height: '100%',
        background: 'white',
        boxShadow: '1px 0 7px rgba(0,0,0,0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '70%',
        maxWidth: '280px',
        zIndex: 200,
        transform: 'translateX(-100%)',
        transition: 'transform 0.3s ease-out',
        '& ul': {
            height: '100%',
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        '& li': {
            margin: '0.5rem 0',
        },
        '& a': {
            color: 'red',
            textDecoration: 'none',
            fontSize: '1.2rem',
        },
        '& a:hover': {
            color: 'orange',
        },
        '& a:active': {
            color: 'orange',
        },
    },
    open: {
        transform: 'translateX(0)',
    },
    '@media (min-width: 769px)': {
        siderDrawer: {
            display: 'none',
        },
    },
});
