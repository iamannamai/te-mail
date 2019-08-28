import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import App from '../../client/App';

jest.mock('axios');

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a set of keys when template is Committed', async () => {
    const { container, getByText } = render(<App />);

    // Add text to template
    await fireEvent.change(
      container.querySelector('textarea[name="template-editor"]'),
      {
        target: {
          value: 'this is my template with my %%key%%'
        }
      }
    );

    // Commit template
    await fireEvent.click(getByText('Commit Template'));

    const nameInput = container.querySelector('input[name="key"]');
    expect(nameInput).toBeVisible();
    expect(nameInput).toBeRequired();
  });

  it('should render warning message if committed template is out of sync with the current template', async () => {
    const { container, getByText } = render(<App />);

    // Add text to template
    await fireEvent.change(
      container.querySelector('textarea[name="template-editor"]'),
      {
        target: {
          value: 'this is my template with my %%key%%'
        }
      }
    );

    // Commit template
    await fireEvent.click(getByText('Commit Template'));

    // Change value in template editor
    await fireEvent.change(
      container.querySelector('textarea[name="template-editor"]'),
      {
        target: {
          value: 'this is my template with my %%key%% with a change'
        }
      }
    );

    expect(getByText('Current and saved templates out of sync')).toBeVisible();
  });

  it('render an email preview modal if Preview is clicked', async () => {
    axios.post.mockResolvedValue('<div>preview</div>');

    const { container, getByText } = render(<App />);

    // Add text to template
    await fireEvent.change(
      container.querySelector('textarea[name="template-editor"]'),
      {
        target: {
          value: 'this is my template with my %%key%%'
        }
      }
    );

    // Commit template & generate keys
    await fireEvent.click(getByText('Commit Template'));

    // Add value for "key"
    await fireEvent.change(container.querySelector('input[name="key"]'), {
      target: {
        value: 'keyValue'
      }
    });

    // Preview Template
    await fireEvent.click(container.querySelector('button#preview'));

    expect(getByText('Email Preview')).toBeVisible();
    expect(axios.post.mock.calls[0][0]).toBe('/api/email/preview');
    expect(axios.post.mock.calls[0][1].inputs.key).toBe('keyValue');
  });

  it('should send an email if all required fields are filled out', async () => {
    axios.post.mockResolvedValue('<div>preview</div>');

    const sender = 'sender@email.com';
    const recipient = 'recipient@email.com';
    const subject = 'Email Subject';
    const keyValue = 'keyValue';

    const { container, getByText } = render(<App />);

    // Add text to template
    await fireEvent.change(
      container.querySelector('textarea[name="template-editor"]'),
      {
        target: {
          value: 'this is my template with my %%key%%'
        }
      }
    );

    // Commit template & generate keys
    await fireEvent.click(getByText('Commit Template'));

    // Add values for sender, recipient, subject, key
    // TODO: abstract function. create a custom function in jest for editing input
    await fireEvent.change(container.querySelector('input[name="sender"]'), {
      target: {
        value: sender
      }
    });
    await fireEvent.change(container.querySelector('input[name="recipient"]'), {
      target: {
        value: recipient
      }
    });
    await fireEvent.change(container.querySelector('input[name="subject"]'), {
      target: {
        value: subject
      }
    });
    await fireEvent.change(container.querySelector('input[name="key"]'), {
      target: {
        value: keyValue
      }
    });

    // Preview Template
    await fireEvent.click(container.querySelector('button#send'));

    expect(axios.post.mock.calls[0][0]).toBe('/api/email');
    expect(axios.post.mock.calls[0][1].inputs).toEqual({
      sender,
      recipient,
      subject,
      key: keyValue
    });
    expect(getByText('Success!')).toBeVisible();
  });
});
