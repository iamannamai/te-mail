import React from 'react';
import { Form, Button, TextArea, Message } from 'semantic-ui-react';

const TemplateEditor = ({
  editedTemplate,
  template,
  setEditedTemplate,
  setTemplate
}) => {
  const handleChange = ({ target: { value } }) => {
    setEditedTemplate(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setTemplate(editedTemplate);
  };

  return (
    <div className="template-editor">
      <Button
        disabled={!editedTemplate && template !== editedTemplate}
        onClick={handleSubmit}
      >
        Commit Template
      </Button>
      <Message
        warning
        header="Current and saved templates out of sync"
        content="The template you generated your keys with is out of sync with the current content. Please hit Commit Template to reconcile your changes. This will clear any values in your keys inputs."
      />
      <Form.Field
        label="Template"
        name="template-editor"
        value={editedTemplate}
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
