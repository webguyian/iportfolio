import React from 'react';
import { create } from 'react-test-renderer';

import CountText from './CountText';

describe('<CountText />', () => {
  it('renders correctly', () => {
    const component = create(<CountText>Reminders</CountText>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with one item', () => {
    const component = create(<CountText count={1}>Reminders</CountText>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple items', () => {
    const component = create(<CountText count={12}>Reminders</CountText>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with custom emptyLabel', () => {
    const component = create(
      <CountText emptyLabel="Zero">Reminders</CountText>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
