import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import {
    useTransactionsQuery,
    TransactionsQueryResult,
    Transaction,
} from '../../generated/graphql';

interface ChartProps {
    currency: string;
}

export const Chart: React.FC<ChartProps> = ({ currency }) => {
    const { data }: TransactionsQueryResult = useTransactionsQuery({
        variables: { currency: currency },
    });

    let dates: Date[] = [];
    let sortedDates: string[] = [];
    let currentDate = moment();

    useEffect(() => {
        if (data) {
            data.transactions.forEach((transaction: Transaction) => {
                let parsedDate: number = Date.parse(transaction.date);
                dates.push(new Date(parsedDate));
            });
        }
        dates
            .sort((a: Date, b: Date) => a.getTime() - b.getTime())
            .forEach((date: Date) => {
                if (moment(date).isSame(currentDate, 'month')) {
                    sortedDates.push(date.toLocaleDateString());
                }
            });
    }, [data, currentDate, dates, sortedDates]);

    return (
        <div>
            <Line
                data={{
                    labels: !!sortedDates ? sortedDates : [],
                    datasets: [
                        {
                            label: 'Spending (this month)',
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
                                ? data.transactions.map((transaction: Transaction) => {
                                      return transaction.amount;
                                  })
                                : [],
                        },
                    ],
                }}
                height={80}
            />
        </div>
    );
};
