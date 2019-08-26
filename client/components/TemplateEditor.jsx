import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

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
    <Form.Group>
      <Form.TextArea value={template} onChange={handleChange} />
      <Button disabled={!template} onClick={handleSubmit}>
        Commit Template
      </Button>
    </Form.Group>
  );
};

export default TemplateEditor;
