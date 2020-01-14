import React, { useState, useEffect } from 'react';

import Triangles from './Triangles'
import Display from './Display'
import Welcome from './Welcome'

import './App.scss';

export default () => {
  const [text, setText] = useState([])

  const onKeyDown = (e) => {
    const arr = Array.from(text)

    if (
      e.metaKey
      || e.key === "Shift"
      || e.key === "Escape"
      || e.key === "Alt"
      || e.key === "Control"
      || e.key.includes('Arrow')
    ) return;

    if (
      "Backspace" === e.key
    ) {
      arr.pop()
      setText(arr)
      return;
    }

    if (
      "Enter" === e.key
    ) {
      arr.push("\n")
      setText(arr)
      return;
    }

    arr.push(e.key)
    setText(arr)
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  });

  return (
    <div className="App" onKeyDown={ onKeyDown }>
      <Welcome text={ text } />
      <Triangles fromText={ text.join('') } />
      <Display text={ text } />
    </div>
  );
}
