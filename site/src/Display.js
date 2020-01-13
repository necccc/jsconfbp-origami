import React, { useState } from 'react';

import './Display.scss';

export default ({ text }) => {

  return (
    <div className="display">
      {text.length > 0 && <span className="quote start">“</span>}
      { text.charAt(0).toUpperCase() + text.slice(1) }
      {text.length > 0 && <span className="quote end">”</span>}
    </div>
  );
}
