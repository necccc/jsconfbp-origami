import "core-js/stable";
import "regenerator-runtime/runtime";
import {fabric} from 'fabric'

import './style.scss';
import { create, get } from './grid'

import settings from './settings'



const renderSurrounding = (arr, grid, canvas) => {
  arr.forEach(([a,b]) => {
    const {x,y} = grid.coordsOf(a,b)
    canvas.add(new fabric.Circle({
      top: y -4,
      left: x -4,
      radius: 4,
      fill: 'cyan'
    }))
  })
}

const showSurroundings = (X,Y, grid, canvas) => {
  renderSurrounding(grid.getSurroundingPoints(X, Y), grid, canvas)
}


const pick = (arr) => arr[fabric.util.getRandomInt(0, arr.length-1)]

const diff = (a1, a2) => {
  return [a1[0] - a2[0], a1[1] - a2[1]]
}
const triangleFrom = (x, y, grid, canvas) => {
  const s1 = [x, y]
  const s2 = [...pick(grid.getSurroundingPoints(x, y))]

  const s3 = grid.getSurroundingPoints(...s2)
    .filter(([a,b]) => {
      // no going back to start point
      if (a === x && b === y) return false


      console.log(diff(s1, s2));

      console.log({
        s1,
        s2,
        s3: [a,b],
      });

      const d = diff(s1, s2)

      if (d[0] === -1 && d[1] === 1) {
        if (b < y - 2) return false
        if (a > x + 1) return false
        if (a > x && b < y - 1) return false
      }
      if (d[0] === -1 && d[1] === -1) {
        if (a > x + 1) return false
        if (a > x && b > y) return false
      }

      //if (a > x + 1) return false
      //if (b > y + 1) return false

      return true
    })


  console.log(
    s3
  );


  renderSurrounding(s3, grid, canvas)


  //const s3 = ['s3', ]
  const s1c = grid.coordsOf(...s1)
  const s2c = grid.coordsOf(...s2)



  canvas.add(new fabric.Circle({
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
}



(function() {
  var canvas = new fabric.Canvas('C', {
    width: 800,
    height: 800
  });

  const grid = create(16, 16, {
    size: settings.edgeDistance
  })

  console.log(grid);

  const coords = grid.all()

  for(const point of coords) {
    canvas.add(new fabric.Circle({
      top: point.y -1,
      left: point.x -1,
      radius: 1,
      fill: 'rebeccapurple'
    }));
  }


  triangleFrom(4,4, grid, canvas)

})();




