import React from 'react';
import { Button, Header, Modal, Container } from 'semantic-ui-react';

const EmailPreview = ({
  preview,
  previewEmail,
  sender,
  recipient,
  subject,
  template
}) => {
  return (
    <Modal
      trigger={
        <Button
          id="preview"
          onClick={previewEmail}
          content="Preview"
          disabled={!template}
          secondary
        />
      }
      centered={false}
    >
      <Modal.Content id="email-preview">
        <Header as="h1">Email Preview</Header>
        <Container>
          <div>
            <span className="email-field-title">From: </span>
            {sender}
          </div>
          <div>
            <span className="email-field-title">To: </span>
            {recipient}
          </div>
          <div>
            <span className="email-field-title">Subject: </span>
            {subject}
          </div>
        </Container>
        <Container
          id="email-content"
          dangerouslySetInnerHTML={{
            __html: preview || '<div/>'
          }}
        />
      </Modal.Content>
    </Modal>
  );
};

export default EmailPreview;
