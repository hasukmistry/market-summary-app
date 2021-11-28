import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { Loader } from '../loader';

const shallowRenderer = createRenderer();

describe('<Loader />', () => {
  it('should match snapshot', () => {
    shallowRenderer.render(<Loader isLoading={true}/>);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});