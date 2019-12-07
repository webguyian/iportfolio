import React from 'react';
import { act, create } from 'react-test-renderer';

import Lockscreen from './Lockscreen';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';

describe('<Lockscreen />', () => {
  const props = {
    history: { push: jest.fn() }
  };

  it('renders correctly', () => {
    const component = create(<Lockscreen {...props} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('handles redirect', () => {
    const component = create(<Lockscreen {...props} />);
    const div = component.root.children[0];

    expect(props.history.push).not.toHaveBeenCalled();

    act(() => {
      div.props.onTransitionEnd();
    });

    expect(props.history.push).toHaveBeenCalledWith('/home');
  });

  it('handles unlock', () => {
    const component = create(<Lockscreen {...props} />);
    const toggleSwitch = component.root.findByType(ToggleSwitch);

    act(() => {
      toggleSwitch.props.onUpdate();
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
