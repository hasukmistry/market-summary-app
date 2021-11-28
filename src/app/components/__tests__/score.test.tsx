import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { Score } from '../score';

const shallowRenderer = createRenderer();

describe('<Score />', () => {
  it('should match snapshot', () => {
    shallowRenderer.render(<Score currentUser={{ id: -1, points: 0, ip_addr: '', timestamp: '' }}
        setCurrentUser={{}}
        currentScore={0}
        setCurrentScore={{}}
        votingEnabled={false} 
        setVotingEnabled={{}}/>);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});