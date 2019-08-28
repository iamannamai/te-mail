import React from 'react';
import { render } from '@testing-library/react';
import { Input } from 'semantic-ui-react';
import '@testing-library/jest-dom/extend-expect';
import { RequiredFieldInput } from '../../../client/components';

describe('RequiredFieldInput', () => {
  it('should render a form field based on a field and an input object', () => {
    const field = {
      name: 'Field',
      placeholder: 'Field',
      type: 'text'
    };
    const inputs = {
      field: 'fieldValue'
    };
    const control = Input;
    const onChange = jest.fn();
    const { container } = render(
      <RequiredFieldInput
        field={field}
        inputs={inputs}
        control={control}
        onChange={onChange}
      />
    );

    expect(
      container.querySelector(`input#${field.name.toLowerCase()}`).value
    ).toBe('fieldValue');
  });
});
