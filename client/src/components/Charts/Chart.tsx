import React from 'react';
import { Line } from 'react-chartjs-2';
import { useTransactionsQuery } from '../../generated/graphql';

export const Chart: React.FC = () => {
    const { data } = useTransactionsQuery({
        variables: { currency: 'EUR' },
    });

    return (
        <div>
            <Line
                data={{
                    labels: !!data
                        ? data.transactions.map((transaction, index) => {
                              let parsedDate = Date.parse(transaction.date);
                              let date: Date = new Date(parsedDate);
                              return date.toLocaleDateString();
                          })
                        : [],
                    datasets: [
                        {
                            label: 'All time',
                            fill: true,
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
                            data: !!data
                                ? data.transactions.map(transaction => {
                                      return transaction.amount;
                                  })
                                : [],
                        },
                    ],
                }}
                height={70}
            />
        </div>
    );
};
