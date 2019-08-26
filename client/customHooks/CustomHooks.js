import React, { useState } from 'react';

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
