import React from 'react';
import { Container } from 'semantic-ui-react';

const EmailPreview = ({ preview }) => {
  return (
    <Container
      dangerouslySetInnerHTML={{
        __html: preview
      }}
    />
  );
};

export default EmailPreview;
