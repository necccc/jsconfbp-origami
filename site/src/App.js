import React, { useState, useEffect } from 'react';

import Triangles from './Triangles'
import Display from './Display'
import Welcome from './Welcome'

import './App.scss';

export default () => {
  const [text, setText] = useState([])

  const onKeyDown = (e) => {
    const arr = Array.from(text)
    const ignore = [
      "Shift",
      "Escape",
      "Esc",
      "Alt",
      "Control",
      "Tab",
      "CapsLock",
      "Delete",
      "Left",
      "Right",
      "Up",
      "Down",
      "End",
      "Home",
      "PageDown",
      "PageUp",
      "Clear",
      "Insert",
      "Unidentified",
    ]
    if (
      e.metaKey
      || ignore.includes(e.key)
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
