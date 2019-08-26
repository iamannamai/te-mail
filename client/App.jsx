import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Input } from 'semantic-ui-react';
import axios from 'axios';

import { TemplateEditor, TemplateKeyArea, EmailPreview } from './components';
import { useForm } from './customHooks/CustomHooks';
import { extractKeys } from './utils';

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
      <Form onSubmit={sendEmail}>
        <TemplateEditor saveTemplate={setTemplate} />
        <Form.Group>
          <Form.Field
            id="sender"
            label="Sender"
            placeholder="Sender Email"
            name="sender"
            type="email"
            control={Input}
            onChange={handleChange}
            value={inputs.sender || ''}
            required
          />
          <Form.Field
            id="recipient"
            label="Recipient"
            placeholder="Recipient Email"
            name="recipient"
            type="email"
            control={Input}
            onChange={handleChange}
            value={inputs.recipient || ''}
            required
          />
        </Form.Group>
        {keys.length > 0 && (
          <TemplateKeyArea
            keys={keys}
            onChange={handleChange}
            values={inputs}
          />
        )}
        <Button onClick={previewEmail}>Preview</Button>
      </Form>
      {emailPreview && <EmailPreview preview={emailPreview} />}
      <Form.Button>Send Email</Form.Button>
    </Container>
  );
};

export default App;
