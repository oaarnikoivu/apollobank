import React from 'react';
import { useUsersQuery } from '../generated/graphql';
import { Loading } from '../components/Loading';

interface Props {}

export const Home: React.FC<Props> = () => {
    const { data } = useUsersQuery({ fetchPolicy: 'network-only' });

    if (!data) {
        return <Loading />;
    }

    return (
        <div>
            <div>users: </div>
            <ul>
                {data.users.map(x => {
                    return (
                        <li key={x.id}>
                            {x.id}, {x.email}, {x.firstName} {x.lastName}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
