import { axios } from "./axios";

export const interval = 60;
export const defaultUser = {
    id: -1,
    points: 0,
    ip_addr: '',
    timestamp: '',
};

const getLiveRates = async () => {
    let endpoint = '/rate';

    let response = await axios.get(endpoint, {});

    return response;
}

const getCurrentUser = async () => {
    let endpoint = '/user';

    let response = await axios.get(endpoint, {});

    return response;
}

const postGuess = async(user: any, vote: string) => {
    let endpoint = '/guess';

    let response = await axios.post(endpoint, { userId: user.id, guess: vote });

    return response;
}

const unResolvedGuess = async(user: any) => {
    let endpoint = `/guess/unResolved?userId=${user.id}`;

    let response = await axios.get(endpoint, {});

    return response;
}

const resolveGuess = async(user: any) => {
    let endpoint = '/guess/resolve';

    let response = await axios.post(endpoint, { userId: user.id });

    return response;
}

export const loadRates = async(dispatcher: any) => {
    let rates = {};
    try {
        let response = await getLiveRates();

        if (response.status === 200 ) {
            rates = response.data;

            console.log(rates);    

            dispatcher('FETCH', rates);
        }
    } catch( err ) {
        console.log(err);

        dispatcher('LOADING', rates);
    }        
}

export const rateReducer = (state: any, action: any) => {
    if (action.type === 'FETCH') {
        return {
            ...state,
            rates: action.rates,
            isLoading: false,
        };
    } else if(action.type === 'LOADING') {
        return {
            ...state,
            rates: {},
            isLoading: true,
        };
    }
    return state;
}

const checkUnResolvedGuess = async(setVotingEnabled: any, user: any) => {
    let unResolvedRes = await unResolvedGuess(user);

    if (unResolvedRes.status === 200 ) {
        unResolvedRes = unResolvedRes.data;

        if (unResolvedRes.count > 0) {
            setVotingEnabled(false);
        } else {
            setVotingEnabled(true);
        }
    }
}

const getUser = async(setCurrentUser: any, setCurrentScore: any, setVotingEnabled: any) => {
    let user;

    let response = await getCurrentUser();

    if (response.status === 200 ) {
        user = response.data;

        console.log(user);

        setCurrentUser(user);

        setCurrentScore(user.points);

        await checkUnResolvedGuess(setVotingEnabled, user);
    }
}

export const loadUser = async(setCurrentUser: any, setCurrentScore: any, setVotingEnabled: any) => {
    try {
        await getUser(setCurrentUser, setCurrentScore, setVotingEnabled);
    } catch( err ) {
        console.log(err);

        setCurrentUser(defaultUser);

        setVotingEnabled(false);
    }
}

export const timer = (seconds: number,  setSeconds: any, currentUser: any, setCurrentUser: any, setCurrentScore: any, setVotingEnabled: any, setLastGuess: any, state: any, dispatch: any) => {
    let timer = setTimeout(() => {
        seconds = Math.abs(seconds - 1);

        if (seconds === 0) {
            setSeconds(interval);

            resolveUserGuess(currentUser, setCurrentUser, setCurrentScore, setVotingEnabled, setLastGuess);

            ( async() => await loadRates(( type: string, rates: {} ) => {
                dispatch({ type, rates });
            }) )();
        } else {
            setSeconds(seconds);
        }
    }, 1000);

    return timer;
}

export const submitGuess = async(user: any, vote: string, setVotingEnabled: any) => {
    try {
        let response = await postGuess(user, vote);

        if (response.status === 200 ) {
            // guessRes = response.data;

            setVotingEnabled(false);
        }
    } catch( err ) {
        console.log(err);

        setVotingEnabled(true);
    }
}

export const resolveUserGuess = async(currentUser: any, setCurrentUser: any, setCurrentScore: any, setVotingEnabled: any, setLastGuess: any) => {
    let response = await resolveGuess(currentUser);
    if (response.status === 200 ) {
        let resolveRes = response.data;

        if ( resolveRes.resolved ) {
            setVotingEnabled(true);

            if ( resolveRes.lastGuessIsCorrect !== null ) {
                setLastGuess(resolveRes.lastGuessIsCorrect);

                await getUser(setCurrentUser, setCurrentScore, setVotingEnabled);
            }
        } else {
            setVotingEnabled(false);
        }        
    }
}