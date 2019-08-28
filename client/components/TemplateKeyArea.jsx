import React from 'react';

import KeyInput from '../components/KeyInput';

const KeyArea = props => {
  const { keys, values, onChange } = props;

  return (
    <div>
      {keys.length > 0 &&
        keys.map((key, i) => {
          return (
            <KeyInput
              key={i}
              id={i}
              name={key}
              value={values[key] || ''}
              onChange={onChange}
            />
          );
        })}
    </div>
  );
};

export default KeyArea;
