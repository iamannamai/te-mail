import React from 'react';
import { Form, Input } from 'semantic-ui-react';

const KeyInput = props => {
  const { name, value, onChange, id } = props;
  return (
    <Form.Field
      id={id}
      label={name}
      placeholder={name}
      name={name}
      value={value}
      onChange={onChange}
      control={Input}
      width={10}
      required
    />
  );
};

export default KeyInput;
