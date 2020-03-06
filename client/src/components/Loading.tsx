import React from 'react';

export const Loading: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <img src="loading.svg" alt="Loading..." style={{ height: '124px' }} />
        </div>
    );
};
