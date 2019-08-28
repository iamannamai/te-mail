import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { EmailPreview } from '../../../client/components';

describe('EmailPreview', () => {
  it('should render an email preview in a modal when "Preview" is clicked', async () => {
    const preview = '<div>test email string</div>';
    const previewEmail = jest.fn();
    const sender = 'sender@email.com';
    const recipient = 'recipient@email.com';
    const subject = 'Test Email';
    const template = 'test email string';
    const { container } = render(
      <EmailPreview
        preview={preview}
        previewEmail={previewEmail}
        sender={sender}
        recipient={recipient}
        subject={subject}
        template={template}
      />
    );

    fireEvent.click(container.querySelector('#preview'));

    expect(previewEmail.mock.calls.length).toBe(1);
  });
});
