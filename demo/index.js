import "core-js/stable";
import "regenerator-runtime/runtime";
import './style.scss';

import Origami from '../src'

const colors = [
  '#DB69FF',
  '#A25FE8',
  '#9375FF',
  '#5F67E8',
  '#6998FF'

  // '#3B1D59',
  // '#994CE6',
  // '#663299',
  // '#6E37A6',
  // '#552A80',
]
/*
[
  '#0D8BFF',
  '#0CB8E8',
  '#01FFF4',
  '#0CE89F',
  '#0DFF6A'
] */

const canvas = {
  width: 300,
  height: 1000
}

Origami({
  colors,
  canvas,
  start: 'center left'
})
  .then(svg => {
    document.querySelector('.svg').innerHTML = svg
  })
  .catch((e) => {
    console.error(e);
  })

