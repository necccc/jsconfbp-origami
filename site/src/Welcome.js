import React, { useState } from 'react';

import './Welcome.scss';

export default ({ text }) => {
  return (
    <div className="welcome">
      { text.length === 0 && "Start typing"}
      { text.length === 1 && "Keep going"}
    </div>
  );
}
