import React, { useEffect } from 'react';
import { loadUser } from "../inc/actions";

type Props = {
    currentUser: {
        id: number,
        points: number,
        ip_addr: string,
        timestamp: string,
    },
    setCurrentUser: any,
    currentScore: number,
    setCurrentScore: any,
    votingEnabled: boolean,
    setVotingEnabled: any
};

export const Score: React.FC<Props> = ({ currentUser, setCurrentUser, currentScore, setCurrentScore, votingEnabled, setVotingEnabled } : Props ) => {
    useEffect(() => {
        let asyncEvents = async() => {
            await loadUser(setCurrentUser, setCurrentScore, setVotingEnabled);
        };

        asyncEvents();
    }, [setCurrentUser, setCurrentScore, setVotingEnabled]);
    return (
        <div style={ scoreStyles }>
            Score <span>{ currentScore }</span>
        </div>
    );
};

const scoreStyles = {
    padding: '5px 14px',
    backgroundColor: '#d9edf7',
    border: '1px solid #bce8f1',
    borderRadius: '15px',
    color: '#337ab7',
    fontWeight: '700'
}
