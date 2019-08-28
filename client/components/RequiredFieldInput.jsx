import React from 'react';
import { Form } from 'semantic-ui-react';

const RequiredFieldInput = ({ field, inputs, control, onChange }) => {
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
      widths="equal"
      required
    />
  );
};

export default RequiredFieldInput;
