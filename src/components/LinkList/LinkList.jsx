import React from 'react';
import { array } from 'prop-types';

import Link from 'components/Link/Link';
import Text from 'components/Text/Text';

const LinkList = props => {
  const { links } = props;
  const baseClass = 'ui-link-list';
  const itemClass = `${baseClass}-item`;
  const linkClass = `${itemClass}-link`;

  return (
    <ul className={baseClass}>
      {links.map(link => (
        <li key={link.abbr} className={itemClass}>
          <Link className={linkClass} to={link.url} external>
            <div
              className={`${linkClass}-icon`}
              style={{ backgroundColor: link.color }}
            >
              <abbr title={link.name}>{link.abbr}</abbr>
            </div>
            <Text className={`${linkClass}-label`}>{link.name}</Text>
          </Link>
        </li>
      ))}
    </ul>
  );
};

LinkList.propTypes = {
  links: array.isRequired
};

export default LinkList;
