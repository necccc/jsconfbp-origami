import "core-js/stable";
import "regenerator-runtime/runtime";
import {fabric} from 'fabric'
import pick from './pick'

import './style.scss';
import { create, get } from './grid'
import * as triangle from './triangle'

import settings from './settings'



const renderSurrounding = (arr, grid, canvas) => {
  arr.forEach(([a,b]) => {
    const {x,y} = grid.coordsOf(a,b)
    canvas.add(new fabric.Circle({
      top: y -2,
      left: x -2,
      radius: 2,
      fill: 'cyan'
    }))
  })
}

const showSurroundings = (X,Y, grid, canvas) => {
  renderSurrounding(grid.getSurroundingPoints(X, Y), grid, canvas)
}

const toPolygonPoints = (...corners) => corners.reduce((arr, points) => {
  arr.push(points)
  return arr
}, [])

const triangleFrom = (x, y, grid, canvas) => {

  const [s1,s2,s3] = triangle.from(x, y, grid, canvas)
  //showSurroundings(...s1, grid, canvas)

  const s1c = grid.coordsOf(...s1)
  const s2c = grid.coordsOf(...s2)
  const s3c = grid.coordsOf(...s3)

//  console.log(s1, s2, s3);


  var polygon = new fabric.Polygon(toPolygonPoints(s1c,s2c,s3c), {
    ...triangle.getPolygonZero(s1c, s2c, s3c),
    stroke: 'purple',
    fill: 'transparent',
    selectable: false,
    objectCaching: false,
  });

  canvas.add(polygon)

  return [s1,s2,s3]


  /* canvas.add(new fabric.Circle({
    top: s1c.y -4,
    left: s1c.x -4,
    radius: 4,
    fill: 'red'
  }))
  canvas.add(new fabric.Circle({
    top: s2c.y -4,
    left: s2c.x -4,
    radius: 4,
    fill: 'green'
  }))
  canvas.add(new fabric.Circle({
    top: s3c.y -4,
    left: s3c.x -4,
    radius: 4,
    fill: 'blue'
  })) */
}



(function() {
  var canvas = new fabric.Canvas('C', {
    width: 800,
    height: 800
  });

  const grid = create(16, 16, {
    size: settings.edgeDistance
  })



  const coords = grid.all()
  for(const point of coords) {

    const text = new fabric.Text(point.__coords.join(','), {
      left: point.x + 2,
      top: point.y + 2,
      fontFamily: 'sans-serif',
      fontSize: 8,
      fill: '#d3d3d3'
    });
    canvas.add(text);


    canvas.add(new fabric.Circle({
      top: point.y -1,
      left: point.x -1,
      radius: 1,
      fill: 'rebeccapurple'
    }));
  }


  let c = triangleFrom(1, 2, grid, canvas)

  Array(16).fill(0).map(() => {
    const s = pick(c)

    c = triangleFrom(...s, grid, canvas)

  })



//   const k = grid.values()
//   for(const point of k) {
//     if (point.value.length > 0){
//       console.log(point);
//     }
//
//   }


})();




