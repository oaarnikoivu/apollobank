import { createMuiTheme, Theme } from '@material-ui/core';

export enum ColorScheme {
    PRIMARY = '#222B2D',
    SECONDARY = '#29AABB',
    ORANGE = '#F15742',
    MAROON = '#432D32',
    WHITE = '#FFFEF9',
    HOVER = '#148C9C',
}

// For Material UI
export const theme: Theme = createMuiTheme({
    palette: {
        primary: {
            main: ColorScheme.PRIMARY,
        },
        secondary: {
            main: ColorScheme.ORANGE,
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});
