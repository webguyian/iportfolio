import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

import { useFetchWithData, useStorageCache } from 'modules/browser/hooks';
import { API_MAIL, defaultBody, defaultValues } from './constants';

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

export const useEventHandlers = (pristine, fields, setFields, setControls) => {
  const [data, setData] = useState();
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const response = useFetchWithData(API_MAIL, data);
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
    setData(fields);
  };
  const onDelete = () => {
    setFields(defaultValues);
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

  useEffect(() => {
    if (response) {
      // Reset data
      setData();
      onDelete();
    }
  }, [response]);

  return eventHandlers;
};

export const useMail = populateFields => {
  const initialValues = populateFields || defaultValues;
  const [fields, setFields, setField] = useFields(initialValues);
  const [invalid, setInvalid] = useState(false);
  const [pristine, setPristine] = useState(true);
  const [showControls, setControls] = useState(false);
  const eventHandlers = useEventHandlers(
    pristine,
    fields,
    setFields,
    setControls
  );
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

    if (isEqual(fields, defaultValues)) {
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
