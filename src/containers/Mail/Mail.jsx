import React from 'react';
import { object } from 'prop-types';
import classNames from 'classnames';

import Button from 'components/Button/Button';
import FormField from 'components/FormField/FormField';
import Link from 'components/Link/Link';
import Text from 'components/Text/Text';

import { useMail } from 'modules/mail/hooks';

const Mail = props => {
  const { location } = props;
  const [fields, setField, state, handlers] = useMail(location.state);
  const baseClass = 'mail-app';
  const headerClass = `${baseClass}-header`;
  const attachmentClass = `${baseClass}-attachment`;
  const controlsClass = `${baseClass}-controls`;
  const showControlsClass = state.showControls && `${controlsClass}--show`;
  const title = fields.subject || 'New Message';

  return (
    <form
      className={baseClass}
      onSubmit={handlers.onSubmit}
      {...handlers.swipe}
    >
      {state.showControls && <div className={`${baseClass}-overlay`} />}
      <Button
        className={`${baseClass}-drag-handle`}
        aria-labelledby={baseClass}
      >
        <Text type="accessible">Drag down to close</Text>
      </Button>
      <div className={`${baseClass}-top-bar`}>
        <Link to="/home" onClick={handlers.onCancel}>
          Cancel
        </Link>
      </div>
      <div className={headerClass}>
        <div className={`${headerClass}-title`}>
          <Text type="display" size="l">
            {title}
          </Text>
          <Button
            disabled={state.invalid}
            icon="arrow-up"
            size="2x"
            type="submit"
          >
            Send
          </Button>
        </div>
        <div className={`${headerClass}-fields`}>
          <FormField
            id="to"
            label="To:"
            disabled
            onChange={setField}
            value={fields.to}
          />
          <FormField
            id="from"
            label="From:"
            onChange={setField}
            placeholder="your@email.com"
            type="email"
            value={fields.from}
          />
          <FormField
            id="subject"
            label="Subject:"
            onChange={setField}
            value={fields.subject}
            maxLength={35}
          />
        </div>
      </div>
      <FormField
        className={`${baseClass}-body`}
        id="body"
        onChange={setField}
        type="textarea"
        value={fields.body}
      />
      <div className={attachmentClass}>
        {fields.attachment && (
          <img
            className={`${attachmentClass}-image`}
            alt="Attached image"
            src={fields.attachment}
          />
        )}
      </div>
      <div className={classNames(controlsClass, showControlsClass)}>
        <Button modifier="anchor-block" onClick={handlers.onDelete}>
          Delete Draft
        </Button>
        <Link to="/home" className="ui-btn--anchor-block">
          Save Draft
        </Link>
        <Button modifier="anchor-block" onClick={handlers.onConfirmCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

Mail.propTypes = {
  location: object.isRequired
};

export default Mail;
