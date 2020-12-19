import React from 'react';
import classNames from 'classnames';

import { useMessages } from 'modules/messages/hooks';

import Avatar from 'components/Avatar/Avatar';
import Link from 'components/Link/Link';
import RoundedButton from 'components/Button/RoundedButton';
import Text from 'components/Text/Text';

const Messages = () => {
  const [messages, containerRef, handleSubmit] = useMessages();
  const baseClass = 'messages-app';
  const listClass = `${baseClass}-list`;
  const listItemClass = `${listClass}-item`;
  const messageClass = `${listItemClass}-message`;
  const messageFromClass = `${listItemClass}--from`;
  const messageToClass = `${listItemClass}--to`;

  return (
    <div className={baseClass}>
      <div className={`${baseClass}-header`}>
        <Link to="/phone">
          <Avatar
            alt="Profile photo of Ian Mac"
            src="https://github.com/webguyian.png?size=50"
          />
          <Text>Ian Mac</Text>
        </Link>
      </div>
      <div className={`${listClass}-container`} ref={containerRef}>
        <ul className={listClass}>
          {messages.map(message => (
            <li
              key={message.id}
              className={classNames(
                listItemClass,
                message.from ? messageFromClass : messageToClass
              )}
            >
              <span className={messageClass}>{message.message}</span>
            </li>
          ))}
        </ul>
      </div>
      <footer className={`${baseClass}-footer`}>
        <form
          className={`${baseClass}-form`}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <input
            className={`${baseClass}-form-input`}
            name="message"
            placeholder="iMessage"
            type="text"
          />
          <RoundedButton icon="arrow-up" type="submit" />
        </form>
      </footer>
    </div>
  );
};

export default Messages;
