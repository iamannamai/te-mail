import React from 'react';
import { Form } from 'semantic-ui-react';

const RequiredKeyInput = props => {
  const { field, inputs, control, onChange } = props;
  const { name, placeholder, type } = field;
  const nameLower = name.toLowerCase();
  return (
    <Form.Field
      id={nameLower}
      label={name}
      placeholder={placeholder}
      name={nameLower}
      type={type}
      control={control}
      onChange={onChange}
      value={inputs[nameLower] || ''}
      width="equal"
      required
    />
  );
};

export default RequiredKeyInput;
