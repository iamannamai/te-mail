import React, { useState, useEffect } from 'react';
import { Container, Form, Input, Message } from 'semantic-ui-react';
import axios from 'axios';

import {
  EmailPreview,
  RequiredFieldInput,
  TemplateEditor,
  TemplateKeyArea
} from './components';
import { useForm } from './customHooks/CustomHooks';
import { extractKeys } from './utils';

const EMAIL_REQUIRED_FIELDS = [
  {
    name: 'Sender',
    placeholder: 'Sender Email',
    type: 'email'
  },
  {
    name: 'Recipient',
    placeholder: 'Recipient Email',
    type: 'email'
  },
  {
    name: 'Subject',
    placeholder: 'Subject',
    type: 'text'
  }
];

const App = () => {
  // Template from which keys were generated
  const [template, setTemplate] = useState('');

  // Current template state
  const [editedTemplate, setEditedTemplate] = useState('');
  const [preview, setEmailPreview] = useState('');
  const [status, setStatus] = useState('');

  const [keys, setKeys] = useState([]);

  const clearStatus = () => {
    setTimeout(() => {
      setStatus('');
    }, 5000);
  };

  const submit = emailTemplate => (
    endpoint,
    setStateMethod
  ) => async inputs => {
    try {
      const req = {
        template: JSON.stringify(emailTemplate).replace(/"/g, ''),
        inputs
      };
      const { data } = await axios.post(endpoint, req);
      if (setStateMethod) {
        setStateMethod(data);
      } else if (endpoint === '/api/email') {
        setStatus('success');
        clearStatus();
      }
    } catch (error) {
      // set any flags here
      setStatus('error');
      clearStatus();
    }
  };

  const { inputs, setInputs, previewEmail, sendEmail, handleChange } = useForm(
    submit(template),
    { setEmailPreview }
  );

  const updateKeys = temp => {
    const keyArray = Array.from(extractKeys(temp));
    const { sender, recipient, subject } = inputs;
    setKeys(keyArray);
    // anytime keys are updated, clear all saved values of inputs as well
    setInputs({
      ...inputs,
      sender,
      recipient,
      subject
    });
  };

  useEffect(() => {
    updateKeys(template);
  }, [template]);

  return (
    <Container>
      <Form
        onSubmit={sendEmail}
        className="flex"
        warning={template !== editedTemplate && keys.length > 0}
        success={status === 'success'}
        error={status === 'error'}
      >
        <TemplateEditor
          editedTemplate={editedTemplate}
          setEditedTemplate={setEditedTemplate}
          setTemplate={setTemplate}
        />
        <div className="inputs">
          <Form.Group>
            <EmailPreview
              preview={preview}
              previewEmail={previewEmail}
              recipient={inputs.recipient}
              sender={inputs.sender}
              subject={inputs.subject}
              template={template}
              editedTemplate={editedTemplate}
            />
            <Form.Button
              id="send"
              disabled={!template && template !== editedTemplate}
              primary
            >
              Send Email
            </Form.Button>
          </Form.Group>
          <Message
            success
            header="Success!"
            content={`Email was sent to ${inputs.recipient}`}
          />
          <Message
            error
            header="An Error Occurred"
            content="We could not successfully send your email. Please try again."
          />
          {EMAIL_REQUIRED_FIELDS.map(field => (
            <RequiredFieldInput
              key={field.name.toLowerCase()}
              field={field}
              inputs={inputs}
              control={Input}
              onChange={handleChange}
            />
          ))}
          {keys.length > 0 && (
            <TemplateKeyArea
              keys={keys}
              onChange={handleChange}
              values={inputs}
            />
          )}
        </div>
      </Form>
    </Container>
  );
};

export default App;
