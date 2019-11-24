import React from 'react';
import { create } from 'react-test-renderer';

import Text from './Text';

describe('<Text />', () => {
  it('renders correctly', () => {
    const component = create(<Text>Text goes here</Text>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with element prop', () => {
    const component = create(
      <Text element="h2" type="display">
        Heading
      </Text>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with modifier prop', () => {
    const component = create(<Text modifier="bold">Text goes here</Text>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
