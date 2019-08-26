import React, { useState } from 'react';
import { Container, Form, Button } from 'semantic-ui-react';

const TemplateEditor = ({ saveTemplate }) => {
  const [template, setTemplate] = useState('');

  const handleChange = ({ target: { value } }) => {
    setTemplate(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    saveTemplate(template);
  };

  return (
    <Container>
      <Form.TextArea
        value={template}
        onChange={handleChange}
        style={{
          minHeight: '70vh'
        }}
      />
      <Button disabled={!template} onClick={handleSubmit}>
        Commit Template
      </Button>
    </Container>
  );
};

export default TemplateEditor;
