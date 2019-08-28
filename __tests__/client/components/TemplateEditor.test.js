import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TemplateEditor } from '../../../client/components';

describe('TemplateEditor', () => {
  it('should disable "Commit Template" button if editedTemplate is empty', () => {
    const editedTemplate = '';
    const template = '';
    const setEditedTemplate = jest.fn();
    const setTemplate = jest.fn();
    const { getByText } = render(
      <TemplateEditor
        editedTemplate={editedTemplate}
        template={template}
        setEditedTemplate={setEditedTemplate}
        setTemplate={setTemplate}
      />
    );

    expect(getByText('Commit Template')).toBeEnabled();
  });

  it('should call setEditedTemplate for onChange actions in template textarea', () => {
    const editedTemplate = 'template text';
    const template = '';
    const setEditedTemplate = jest.fn();
    const setTemplate = jest.fn();
    const { container } = render(
      <TemplateEditor
        editedTemplate={editedTemplate}
        template={template}
        setEditedTemplate={setEditedTemplate}
        setTemplate={setTemplate}
      />
    );

    const newVal = 'newValue';
    fireEvent.change(
      container.querySelector('textarea[name="template-editor"]'),
      {
        target: { value: newVal }
      }
    );

    expect(setEditedTemplate.mock.calls[0][0]).toBe(newVal);
  });

  it('should call setTemplate when hitting "Commit Template"', () => {
    const editedTemplate = 'newString edited';
    const template = 'newString';
    const setEditedTemplate = jest.fn();
    const setTemplate = jest.fn();
    const { container } = render(
      <TemplateEditor
        editedTemplate={editedTemplate}
        template={template}
        setEditedTemplate={setEditedTemplate}
        setTemplate={setTemplate}
      />
    );

    fireEvent.click(container.querySelector('button#commit'));

    expect(setTemplate.mock.calls[0][0]).toBe(editedTemplate);
  });
});
