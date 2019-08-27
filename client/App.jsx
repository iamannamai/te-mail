import React, { useState, useEffect } from 'react';
import { Container, Form, Input } from 'semantic-ui-react';
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
  const [template, setTemplate] = useState('');
  const [emailPreview, setEmailPreview] = useState('');
  const [keys, setKeys] = useState([]);

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
      if (setStateMethod) setStateMethod(data);
    } catch (error) {
      // set any flags here
      console.error(error);
    }
  };

  const { inputs, setInputs, previewEmail, sendEmail, handleChange } = useForm(
    submit(template),
    {
      setEmailPreview
    }
  );

  const updateKeys = temp => {
    const keyArray = Array.from(extractKeys(temp));
    setKeys(keyArray);
    // anytime keys are updated, clear all saved values of inputs as well
    setInputs({});
  };

  useEffect(() => {
    updateKeys(template);
  }, [template]);

  return (
    <Container>
      <Form onSubmit={sendEmail} className="flex">
        <TemplateEditor saveTemplate={setTemplate} />
        <div className="inputs">
          <Form.Group>
            <EmailPreview
              preview={emailPreview}
              previewEmail={previewEmail}
              recipient={inputs.recipient}
              sender={inputs.sender}
              subject={inputs.subject}
              template={template}
            />
            <Form.Button disabled={!template} primary>
              Send Email
            </Form.Button>
          </Form.Group>
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
