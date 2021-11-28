import React from 'react';

type Props = {
    isLoading: boolean;
};

export const Loader: React.FC<Props> = ({ isLoading } : Props ) => {
    return (
        <div className={"loader " + (isLoading ? 'block' : 'hidden')}></div>
    );
};
