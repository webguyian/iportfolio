import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

import { useStorageCache } from 'modules/browser/hooks';
import { defaultBody, initialValues } from './constants';

export const useFields = initial => {
  const [fields, setFields] = useState(initial);
  const setField = (id, value) => {
    setFields(values => ({
      ...values,
      [id]: value
    }));
  };

  return [fields, setFields, setField];
};

export const useEventHandlers = (pristine, setFields, setControls) => {
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const onCancel = useCallback(
    event => {
      if (!pristine) {
        event.preventDefault();
        setControls(true);
      }
    },
    [pristine]
  );
  const onSubmit = event => {
    event.preventDefault();
  };
  const onDelete = () => {
    setFields(initialValues);
    setRedirect(true);
  };
  const eventHandlers = {
    onCancel,
    onConfirmCancel: setControls.bind(null, false),
    onDelete,
    onSubmit
  };

  useEffect(() => {
    if (redirect) {
      history.push('/home');
    }
  }, [redirect]);

  return eventHandlers;
};

export const useMail = () => {
  const [fields, setFields, setField] = useFields(initialValues);
  const [invalid, setInvalid] = useState(false);
  const [pristine, setPristine] = useState(true);
  const [showControls, setControls] = useState(false);
  const eventHandlers = useEventHandlers(pristine, setFields, setControls);
  const cache = useStorageCache('mail', { fields }, res =>
    isEqual(res.fields, initialValues)
  );
  const state = {
    invalid,
    showControls
  };

  useEffect(() => {
    const { from, body, subject } = fields;
    const required = [from, subject, body];

    if (
      required.every(field => field.trim().length) &&
      body.trim() !== defaultBody.trim()
    ) {
      setInvalid(false);
    } else {
      setInvalid(true);
    }

    if (isEqual(fields, initialValues)) {
      setPristine(true);
    } else {
      setPristine(false);
    }
  }, [fields]);

  useEffect(() => {
    const cachedFields = cache && cache.fields;
    const from = document.getElementById('from');

    if (cachedFields) {
      // Set fields from local storage
      setFields(cachedFields);
    }

    if (from) {
      from.focus();
    }
  }, []);

  return [fields, setField, state, eventHandlers];
};
