import React from 'react';

import './Display.scss';

export default ({ text }) => {

  return (!!text.length && <div className="display">
      { text.length > 0 && <span className="quote start">“</span> }
      { text.map((t, i) => {
        if (i === 0) return t.toUpperCase();
        if (t === "\n") return <br key={`br-${i}`} />;
        return t
      }) }
      { text.length > 0 && <span className="quote end">”</span> }
    </div>
  );
}
