import "core-js/stable";
import "regenerator-runtime/runtime";
import './style.scss';

import Origami from './lib'


Origami()
  .then(svg => {
    document.querySelector('.svg').innerHTML = svg
  })
  .catch((e) => {
    console.error(e);
  })

