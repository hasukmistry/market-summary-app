import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { Timer } from '../timer';

const shallowRenderer = createRenderer();

describe('<Timer />', () => {
  it('should match snapshot', () => {
    shallowRenderer.render(<Timer seconds={60}/>);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});