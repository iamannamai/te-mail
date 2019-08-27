import React, { useState } from 'react';
import { Form, Button, TextArea } from 'semantic-ui-react';

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
    <div className="template-editor">
      <Button disabled={!template} onClick={handleSubmit}>
        Commit Template
      </Button>
      <Form.Field
        label="Template"
        name="template-editor"
        value={template}
        onChange={handleChange}
        control={TextArea}
        style={{
          minHeight: '70vh'
        }}
      />
    </div>
  );
};

export default TemplateEditor;
