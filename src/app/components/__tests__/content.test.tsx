import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { Content } from '../content';

const shallowRenderer = createRenderer();

describe('<Content />', () => {
  it('should match snapshot', () => {
    shallowRenderer.render(<Content seconds={ 60 }
        currentUser={{ id: -1, points: 0, ip_addr: '', timestamp: '' }} 
        isLoading={ false }
        setIsLoading={{}}
        votingEnabled={true} 
        setVotingEnabled={{}} 
        lastGuess={null}
        state={{ rates: { last_trade_price: 0 }}}
        dispatch={{}}/>);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});