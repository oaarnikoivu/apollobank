import { createMuiTheme, Theme } from '@material-ui/core';

enum ColorScheme {
    PRIMARY = '#2196f3',
}

export const theme: Theme = createMuiTheme({
    palette: {
        primary: {
            main: ColorScheme.PRIMARY,
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});
