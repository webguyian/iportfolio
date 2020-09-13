import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'components/Avatar/Avatar';
import Flip from 'components/Flip/Flip';
import Icon from 'components/Icon/Icon';
import Link from 'components/Link/Link';
import Text from 'components/Text/Text';

import {
  COORDINATES_PHILADELPHIA,
  STATIC_MAP_API
} from 'modules/map/constants';

const Phone = () => {
  const baseClass = 'phone-app';
  const imageClass = `${baseClass}-image`;
  const actionsClass = `${baseClass}-actions`;
  const infoClass = `${baseClass}-info`;
  const actions = [
    {
      to: '/messages',
      icon: 'comment',
      label: 'message'
    },
    {
      to: '#call',
      icon: 'phone-alt',
      label: 'call'
    },
    {
      to: '/mail',
      icon: 'envelope',
      label: 'mail'
    }
  ];
  const links = [
    {
      label: 'Email',
      to: 'mailto:hello@webguyian.com',
      value: 'hello@webguyian.com'
    },
    {
      label: 'Website',
      to: 'https://webguyian.com',
      value: 'webguyian.com'
    },
    {
      label: 'Github',
      to: 'https://github.com/webguyian',
      value: 'github.com/webguyian'
    }
  ];

  return (
    <div className={baseClass}>
      <header>
        <figure className={imageClass}>
          <Flip back={<Avatar alt="Ian Mac" text="IM" />}>
            <Avatar
              alt="Ian Mac"
              src="https://github.com/webguyian.png?size=150"
            />
          </Flip>
          <figcaption className={`${imageClass}-caption`}>
            <Text element="h1">Ian Mac</Text>
          </figcaption>
        </figure>
        <ul className={actionsClass}>
          {actions.map(action => (
            <li key={action.icon}>
              <Link to={action.to} icon={action.icon} iconSize="lg" withLabel>
                {action.label}
              </Link>
            </li>
          ))}
        </ul>
      </header>
      <div className={infoClass}>
        {links.map(link => (
          <div key={link.label} className={`${infoClass}-row`}>
            <Text className={`${infoClass}-label`} element="h2">
              {link.label}
            </Text>
            <Link
              className={`${infoClass}-value`}
              to={link.to}
              data-hover={link.value}
              external
            >
              {link.value}
            </Link>
          </div>
        ))}
        <div className={`${infoClass}-row`}>
          <Text className={`${infoClass}-label`} element="h2">
            Location
          </Text>
          <Link
            to="/map"
            className={`${infoClass}-map-link`}
            state={{
              theme: 'light',
              center: COORDINATES_PHILADELPHIA
            }}
          >
            <Text className={`${infoClass}-map-link-text`}>
              <Icon name="map-marker-alt" /> View Map
            </Text>
            <img alt="Philadelphia, PA" src={STATIC_MAP_API} />
          </Link>
        </div>
      </div>
    </div>
  );
};

Phone.propTypes = {
  className: PropTypes.string
};

export default Phone;
