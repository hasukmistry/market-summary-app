import React from 'react';
import { Timer } from './timer';
import { Score } from './score';

type Props = {
    seconds: number,
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

export const TopBar: React.FC<Props> = ({ seconds, currentUser, setCurrentUser, currentScore, setCurrentScore, votingEnabled, setVotingEnabled } : Props ) => {
    return (
        <div className="flex justify-end">
            <Timer seconds={ seconds }></Timer>
            <Score 
                currentUser={ currentUser }
                setCurrentUser={ setCurrentUser }
                currentScore={ currentScore }
                setCurrentScore={ setCurrentScore }
                votingEnabled={ votingEnabled } 
                setVotingEnabled={ setVotingEnabled }></Score>
        </div>
    );
};

