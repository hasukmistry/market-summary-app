import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { TopBar } from '../topbar';

const shallowRenderer = createRenderer();

describe('<TopBar />', () => {
  it('should match snapshot', () => {
    shallowRenderer.render(<TopBar seconds={60} currentUser={{ id: -1, points: 0, ip_addr: '', timestamp: '' }} setCurrentUser={{}} currentScore={0} setCurrentScore={{}} votingEnabled={false} setVotingEnabled={0}/>);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});