import "core-js/stable";
import "regenerator-runtime/runtime";
import {fabric} from 'fabric'
import pick from './pick'

import './style.scss';
import { create, get } from './grid'
import * as triangle from './triangle'

import settings from './settings'


const pickColor = () => pick(settings.colors)

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


const drawTriangleAt = (x, y, grid, canvas) => {
  const [s1,s2,s3] = triangle.from(x, y, grid, canvas)

  //console.log(s1, s2, s3);

  const s1c = grid.coordsOf(...s1)
  const s2c = grid.coordsOf(...s2)
  const s3c = grid.coordsOf(...s3)

  const opts = {
    ...triangle.getPolygonZero(s1c, s2c, s3c),
    stroke: 'purple',
    fill: 'transparent',
    selectable: false,
    objectCaching: false,
  }

  if (settings.fill) {
    const color = pickColor()
    opts.fill = color
    opts.stroke = 'transparent'
    opts.shadow = new fabric.Shadow({
      color,
      blur: 1,
      offsetX: 0,
      offsetY: 0,
    })
  } else {
    opts.fill = 'transparent'
    opts.stroke = pickColor()
  }

  const polygon = new fabric.Polygon(toPolygonPoints(s1c,s2c,s3c), opts);
  canvas.add(polygon)

  return [s1,s2,s3]
}



(function() {
  var canvas = new fabric.Canvas('C', settings.canvas);

  const grid = create(settings.grid.x, settings.grid.y, {
    size: settings.grid.edgeDistance
  })

  //grid.debug(canvas);

  const start = [2,1]
  const notStart = (p) => (p[0] !== start[0] && p[1] !== start[1])

  let c = drawTriangleAt(...start, grid, canvas)

  Array(6).fill(0).map((n, i) => {
    // pick a point from last drawn tringle
    // which is not filled
    let s = pick(
      c.filter(k => (grid.contentOf(...k).length < 4))
    )

    // no points avail,
    // pick one of the surrounding ones
    if (!s) {
      s = pick(
        grid
          .getSurroundingPoints(...pick(c.filter(notStart)))
          .filter(notStart)
      )
    }

    try {
      // draw!
      c = drawTriangleAt(...s, grid, canvas)
    } catch (e) {
      // failed to draw, try again
      const s2 = pick(
        grid
          .getSurroundingPoints(...pick(c))
          .filter(notStart)
          .filter(point => (point[0] !== c[0] && point[1] !== c[0]))
      )

      c = drawTriangleAt(...s2, grid, canvas)
    }
  })
})();




