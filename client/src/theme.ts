import { createMuiTheme, Theme } from '@material-ui/core';

export enum ColorScheme {
    PRIMARY = '#1976d2',
    SECONDARY = '#dc004e',
    INFO = '#6f6f6f',
    WHITE = '#fafafa',
    HOVER = '#0c61b6',
}

export const theme: Theme = createMuiTheme({
    palette: {
        primary: {
            main: ColorScheme.PRIMARY,
        },
        secondary: {
            main: ColorScheme.SECONDARY,
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});
