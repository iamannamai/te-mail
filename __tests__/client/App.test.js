import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import App from '../../client/App';

jest.mock('axios');

describe('App', () => {
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

    expect(container.querySelector('input[name="key"]')).toBeVisible();
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
});
