import React, { useState } from 'react';
import './Input.scss';

export default ({ onChange }) => {
  return (
    <div className="input">
      <input type="text" onChange={ ({target}) => onChange(target.value) } />
    </div>
  );
}
