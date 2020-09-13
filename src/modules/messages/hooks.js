import { useEffect, useRef, useState } from 'react';

import {
  useFetch,
  useFetchWithData,
  useStorageCache
} from 'modules/browser/hooks';
import { API_MESSAGES } from './constants';

export const useMessages = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [messages, setMessages] = useState([]);
  const cache = useStorageCache('messages', messages, m => !m.length);
  const response = useFetch(url);
  const dataResponse = useFetchWithData(API_MESSAGES, data);
  const container = useRef();
  const handleSubmit = event => {
    const form = event.target;
    const input = form.elements.message;
    const message = input.value.trim();
    const id = Math.random().toString(16).slice(2);
    const fromMessage = {
      id,
      message,
      timestamp: new Date(),
      to: 'webguyian'
    };

    if (message.length) {
      setData(fromMessage);
      setMessages(messages.concat(fromMessage));
    }

    event.preventDefault();
    form.reset();
    input.focus();
  };

  useEffect(() => {
    if (cache && cache.length) {
      setMessages(cache);
      return;
    }

    if (!response) {
      setUrl(API_MESSAGES);
      return;
    }

    setMessages(messages.concat(response));
  }, [response]);

  useEffect(() => {
    if (dataResponse) {
      setData(null);
      setMessages(messages.concat(dataResponse));
    }
  }, [dataResponse]);

  useEffect(() => {
    const containerElement = container && container.current;

    if (containerElement && messages.length > 9) {
      const li = containerElement.querySelector('li:last-child');

      li.scrollIntoView({ behavior: 'smooth' });
    }
  }, [container, messages]);

  return [messages, container, handleSubmit];
};
