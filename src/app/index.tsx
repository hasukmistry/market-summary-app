import React, { useState, useEffect, useReducer } from 'react'
import { TopBar } from './components/topbar';
import { Content } from './components/content';
import { Loader } from './components/loader';
import { interval, timer, defaultUser, rateReducer } from "./inc/actions";

export function App() {
    const [seconds, setSeconds] = useState(interval);
    const [isLoading, setIsLoading] = useState(true);

    const [votingEnabled, setVotingEnabled] = useState(false);
    const [currentUser, setCurrentUser] = useState(defaultUser);
    const [currentScore, setCurrentScore] = useState(0);
    const [lastGuess, setLastGuess] = useState(null);

    const [state, dispatch] = useReducer(rateReducer, { rates: {}, isLoading: true });
    
    useEffect(() => {
        timer(seconds, setSeconds, currentUser, setCurrentUser, setCurrentScore, setVotingEnabled, setLastGuess, state, dispatch);
    }, [ seconds, currentUser, state, dispatch ]);

    return (
        <div className="main">
            <div className="container mx-auto my-5 font-sans">
                <TopBar 
                    seconds={ seconds }
                    currentUser={ currentUser }
                    setCurrentUser={ setCurrentUser }
                    currentScore={ currentScore }
                    setCurrentScore={ setCurrentScore }
                    votingEnabled={ votingEnabled } 
                    setVotingEnabled={ setVotingEnabled }></TopBar>
                <Content
                    seconds={ seconds }
                    currentUser={ currentUser } 
                    isLoading={ isLoading }
                    setIsLoading={ setIsLoading }
                    votingEnabled={ votingEnabled } 
                    setVotingEnabled={ setVotingEnabled } 
                    lastGuess={ lastGuess }
                    state={ state }
                    dispatch={ dispatch }></Content>
            </div>
            <Loader isLoading={ isLoading }></Loader>
        </div>
    );
}

export default App;