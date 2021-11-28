import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { TopBar } from '../topbar';

const shallowRenderer = createRenderer();

describe('<TopBar />', () => {
  it('should match snapshot', () => {
    shallowRenderer.render(<TopBar timerSeconds={60} userScore={0}/>);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});