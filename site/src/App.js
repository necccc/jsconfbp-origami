import React, { useState } from 'react';

import Triangles from './Triangles'
import Input from './Input'
import Display from './Display'
import Welcome from './Welcome'

import './App.scss';

export default () => {
  const [text, setText] = useState('')

  const onKeyDown = (e) => {
    console.log(e.keyCode);

  }

  return (
    <div className="App" onKeyDown={ onKeyDown }>
      <Welcome text={text} />
      <Triangles fromText={ text } />
      <Display text={ text } />
      <Input onChange={ t => setText(t) } />
    </div>
  );
}
