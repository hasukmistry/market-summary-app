import React, { useState, useEffect } from 'react';
import { loadRates, submitGuess } from "../inc/actions";

type Props = {
    seconds: number,
    currentUser: {
        id: number,
        points: number,
        ip_addr: string,
        timestamp: string,
    },
    isLoading: boolean,
    setIsLoading: any,
    votingEnabled: boolean,
    setVotingEnabled: any,
    lastGuess: boolean | null,
    state: any,
    dispatch: any
};

export const Content: React.FC<Props> = ({ seconds, currentUser, isLoading, setIsLoading, votingEnabled, setVotingEnabled, lastGuess, state, dispatch } : Props ) => {
    const [checkedVal, setCheckedVal] = useState('up');    

    const makeGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedVal( e.currentTarget.value );
    }

    const submitGuessForm = (e: React.MouseEvent<HTMLInputElement>) => {
        setVotingEnabled(false);

        submitGuess(currentUser, checkedVal, setVotingEnabled);
    }

    useEffect(() => {
        let asyncEvents = async() => {
            await loadRates(( type: string, rates: {} ) => {
                dispatch({ type, rates });
            });
    
            setIsLoading(false);
        };

        asyncEvents();
    }, [ dispatch, setIsLoading ]);

    const guessStatus = () => {
        if ( lastGuess ) {
            return (
                <div className="mb-4" style={ alertSuccess }>Awesome, Your last guess was correct.</div>
            );
        } else if ( lastGuess === false ) {
            return (
                <div className="mb-4" style={ alertDanger }>Try again, Your last guess was incorrect.</div>
            );
        }
    }
    const guessingBlock = () => {
        if (votingEnabled && currentUser.id !== -1) {
            return (
                <div className="flex flex-col md:mt-20 p-5 w-full md:w-1/2" style={ guessStyles }>
                    { guessStatus() }
                    <form>
                        <h3 className="font-medium text-lg text-gray-600">What change will happen next?</h3>
                        <div className="text-sm">i. Each correct guess will earn you 1 point.</div>
                        <ul className="flex flex-col lg:flex-row py-4">
                            <li className="mr-4"> <input checked = { 'up' === checkedVal ? true : false } className="relative" style={ radioButton } onChange={ makeGuess } type="radio" value="up" name="guess" />Price will go higher &#8593;</li>
                            <li> <input className="relative" style={ radioButton } onChange={ makeGuess } type="radio" value="down" name="guess" />Price will go lower &#8595;</li>
                        </ul>
                        <div>
                            <input className="primary-button inline-block" onClick={ submitGuessForm } type="button" value="Guess" />
                        </div>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col md:mt-20 p-5 w-full md:w-1/2" style={ guessStyles }>
                    <div className="font-medium text-base text-gray-600">Please wait...</div>
                    <div className="font-medium text-base text-gray-600">While we calculate the result.</div>
                    <div className="font-medium text-base text-gray-600">Voting is disabled for a while.</div>
                </div>
            );
        }
    }

    return (
        <div className="flex flex-col items-center justify-center mt-10 px-5">
            <div className="py-20 w-full md:w-1/2 lg:w-1/3">
                <h1 className="text-lg md:text-2xl text-gray-900">Market Summary &gt; Bitcoin - USD</h1>

                <div className="my-5 text-center" style={ panelStyles }>
                    <div className="text-xl md:text-3xl font-semibold font-mono" style={ panelBody }>{ state.rates.last_trade_price }$</div>
                </div>
            </div>

            { guessingBlock() }
        </div>
    );
};

const panelStyles = {
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 1px 1px rgb(0 0 0 / 5%)'
}

const panelBody = {
    backgroundColor: '#d9edf7',
    color: '#31708f',
    borderColor: '#bce8f1',
    padding: '10px 15px',
    borderBottom: '1px solid transparent',
    borderTopLeftRadius: '3px',
    borderTopRightRadius: '3px'
}

const guessStyles = {
    border: '1px solid #e3e3e3'
}

const radioButton = {
    top: '1px',
    marginRight: '4px'
}

const alertSuccess = {
    backgroundColor: '#d4edda',
    color: '#155724',
    borderColor: '#c3e6cb',
    padding: '.75rem 1.25rem',
}

const alertDanger = {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderColor: '#f5c6cb',
    padding: '.75rem 1.25rem',
}