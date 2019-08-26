import React from 'react';
import { Form } from 'semantic-ui-react';

import KeyInput from '../components/KeyInput';

const KeyArea = props => {
  const { keys, values, onChange } = props;

  return (
    <Form.Group>
      {keys.length > 0 &&
        keys.map((key, i) => {
          return (
            <KeyInput
              key={i}
              id={i}
              name={key}
              value={values[key] || ''}
              onChange={onChange}
              required
            />
          );
        })}
    </Form.Group>
  );
};

export default KeyArea;
