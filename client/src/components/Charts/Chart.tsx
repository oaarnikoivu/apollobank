import React from 'react';
import { Line } from 'react-chartjs-2';
import { Typography, ThemeProvider } from '@material-ui/core';
import { theme, ColorScheme } from '../../utils/theme';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
        },
    ],
};
export const Chart: React.FC = () => {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Typography
                    style={{ fontWeight: 'bold', color: ColorScheme.PRIMARY }}
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                >
                    Today
                </Typography>
            </ThemeProvider>
            <Line data={data} height={70} />
        </div>
    );
};
