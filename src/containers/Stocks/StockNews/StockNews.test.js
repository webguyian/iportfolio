import React from 'react';
import { act, create } from 'react-test-renderer';

import * as hooks from 'modules/stocks/hooks';
import StockNews from './StockNews';

describe('<StockNews />', () => {
  const news = [
    {
      category: 'top news',
      datetime: 1581389291,
      headline:
        "Kobe Bryant's wife Vanessa wishes 'this nightmare would be over'",
      id: 958565,
      image:
        'https://s4.reutersmedia.net/resources/r/?m=02&d=20200211&t=2&i=1488599576&w=1200&r=LYNXMPEG1A07U',
      related: '',
      source: 'Reuters',
      summary:
        'Vanessa Bryant said in an Instagram post on Monday that she was both grieving and angry over the loss of her husband, NBA star Kobe Bryant, and 13-year-old Gianna in a helicopter crash last month.',
      url: 'https://www.reuters.com/article/us-people-bryant/kobe-bryants-wife-vanessa-wishes-this-nightmare-would-be-over-idUSKBN20507K'
    },
    {
      category: 'top news',
      datetime: 1581389048,
      headline:
        'Coronavirus case confirmed in California, takes U.S. total to 13',
      id: 958566,
      image: 'https://s4.reutersmedia.net/resources_v2/images/rcom-default.png',
      related: '',
      source: 'Reuters',
      summary:
        'The 13th case of coronavirus in the United States was detected in California in an individual under federal quarantine after returning from Wuhan, China, the U.S. Centers for Disease Control and Prevention (CDC) said on Monday.',
      url: 'https://www.reuters.com/article/us-china-health-usa-sandiego/coronavirus-case-confirmed-in-california-takes-u-s-total-to-13-idUSKBN20505I'
    }
  ];
  const values = [news, false, jest.fn(), {}];

  hooks.useStockNews = jest.fn(() => values);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly without news', () => {
    const component = create(<StockNews />);

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with news', () => {
    hooks.useStockNews.mockReturnValue(values);
    const component = create(<StockNews draggable />);

    expect(component).toMatchSnapshot();
  });

  it('handles slide up', () => {
    hooks.useStockNews.mockReturnValue([news, true, jest.fn(), {}]);
    const component = create(<StockNews draggable />);
    const button = component.root.findByProps({
      className: 'stock-news-drag-handle'
    });

    act(() => {
      button.props.onClick();
    });

    expect(component).toMatchSnapshot();
  });
});
