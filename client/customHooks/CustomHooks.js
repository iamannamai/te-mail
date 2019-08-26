import React, { useState } from 'react';

/**
 * Custom form hook to keep track of inputs in a form
 * @param {function} cb - callback function to execute during handleSubmit
 * @return {object} - object containing inputs state, setInput handler to update inputs, handleSubmit, and handleChange functions
 */
export const useForm = cb => {
  const [inputs, setInputs] = useState({});

  const handleSubmit = event => {
    event.preventDefault();
    cb(inputs);
  };

  // accepts event as argument
  const handleChange = ({ target: { name, value } }) => {
    console.log(inputs);
    setInputs(inputs => ({ ...inputs, [name]: value }));
  };

  return {
    inputs,
    setInputs,
    handleSubmit,
    handleChange
  };
};
