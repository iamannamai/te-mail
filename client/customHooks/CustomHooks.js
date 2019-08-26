import React, { useState } from 'react';

const BASE_API = '/api';
const EMAIL_URL = `${BASE_API}/email`;
const PREVIEW_URL = `${BASE_API}/email/preview`;

/**
 * Custom form hook to keep track of inputs in a form
 * @param {function} cb - callback function to execute during handleSubmit
 * @return {object} - object containing inputs state, setInput handler to update inputs, handleSubmit, and handleChange functions
 */
export const useForm = (submit, options) => {
  const [inputs, setInputs] = useState({});

  const previewEmail = event => {
    event.preventDefault();
    submit(PREVIEW_URL, options.setEmailPreview)(inputs);
  };

  const sendEmail = event => {
    event.preventDefault();
    submit(EMAIL_URL)(inputs);
  };

  // accepts event as argument
  const handleChange = ({ target: { name, value } }) => {
    setInputs(inputs => ({ ...inputs, [name]: value }));
  };

  return {
    inputs,
    setInputs,
    previewEmail,
    sendEmail,
    handleChange
  };
};
