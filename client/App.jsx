import React, { useState, useContext, useEffect } from 'react';
import { Container, Form, Input } from 'semantic-ui-react';
import axios from 'axios';

import TemplateEditor from './components/TemplateEditor';
import TemplateKeyArea from './components/TemplateKeyArea';
import { useForm } from './customHooks/CustomHooks';
import { extractKeys } from './utils';

const App = () => {
  const [template, setTemplate] = useState('');
  const [keys, setKeys] = useState([]);

  const preview = emailTemplate => async inputs => {
    try {
      const req = {
        template: JSON.stringify(emailTemplate),
        inputs
      };
      const { data: prev } = await axios.post('/api/email/preview', req);
      console.log(prev);
    } catch (error) {
      // set any flags here
      console.error(error);
    }
  };

  const { inputs, setInputs, handleSubmit, handleChange } = useForm(
    preview(template)
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
      <Form onSubmit={handleSubmit}>
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
        <Form.Button>Preview</Form.Button>
      </Form>
    </Container>
  );
};

export default App;
