import React from 'react';

type Props = {
    seconds: number,
};

export const Timer: React.FC<Props> = ({ seconds } : Props ) => {
    return (
        <div className="mr-2" style={ timerStyles }>
            { seconds }
        </div>
    );
};

const timerStyles = {
    padding: '5px 14px',
    backgroundColor: '#dff0d8',
    border: '1px solid #d6e9c6',
    borderRadius: '15px',
    color: '#3c763d',
    fontWeight: '700',
    cursor: 'not-allowed'
}