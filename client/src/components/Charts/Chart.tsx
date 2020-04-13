import React from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import { useTransactionsQuery, TransactionsQueryResult } from '../../generated/graphql';

interface ChartProps {
    currency: string;
}

export const Chart: React.FC<ChartProps> = ({ currency }) => {
    const { data }: TransactionsQueryResult = useTransactionsQuery({
        variables: { currency: currency },
    });

    return (
        <>
            <div style={{ width: '100%', height: '320px' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    Spending (this month)
                </div>
                <ResponsiveContainer width="100%">
                    <AreaChart
                        data={
                            !!data
                                ? data.transactions.map(transaction => {
                                      return {
                                          date: new Date(
                                              Date.parse(transaction.date),
                                          ).toLocaleDateString(),
                                          type: transaction.transactionType,
                                          amount: transaction.amount,
                                      };
                                  })
                                : []
                        }
                        margin={{
                            top: 24,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="amount" stroke="#29AABB" fill="#29AABB" />
                        <Area type="monotone" dataKey="type" stroke="#F15742" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};
