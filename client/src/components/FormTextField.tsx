import { FieldAttributes, useField } from 'formik';
import React from 'react';
import { ThemeProvider, CssBaseline, TextField } from '@material-ui/core';
import { theme } from '../theme';

export const FormTextField: React.FC<FieldAttributes<{}>> = ({
    placeholder,
    className,
    type,
    ...props
}) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TextField
                className={className}
                type={type}
                variant="standard"
                required={true}
                placeholder={placeholder}
                {...field}
                helperText={errorText}
                error={!!errorText}
            />
        </ThemeProvider>
    );
};
