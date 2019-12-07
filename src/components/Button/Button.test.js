import React from 'react';
import { create } from 'react-test-renderer';

import Button from './Button';

describe('<Button />', () => {
  it('renders correctly', () => {
    const component = create(<Button />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with children', () => {
    const component = create(<Button>Button text</Button>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with icon', () => {
    const component = create(<Button icon="plus-circle">Add</Button>);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with icon and label', () => {
    const component = create(
      <Button icon="plus-circle" withLabel>
        Add
      </Button>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with custom className', () => {
    const component = create(<Button className="custom-btn" />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
