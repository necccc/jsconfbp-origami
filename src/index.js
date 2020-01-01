import "core-js/stable";
import "regenerator-runtime/runtime";
import {fabric} from 'fabric'
import pick from './pick'

import './style.scss';
import { create, get } from './grid'
import * as triangle from './triangle'

import settings from './settings'
import { async } from "regenerator-runtime/runtime";


const pickColor = () => pick(settings.colors)
/*
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
 */


const toPolygonPoints = (...corners) => corners.reduce((arr, points) => {
  arr.push(points)
  return arr
}, [])

const animate = (startPoint, endPoints, polygon, canvas) => {
  const startPoints = [startPoint,startPoint,startPoint]

  const animatePoint = (index, prop, startValue, endValue) => new Promise((resolve, reject) => {

    /* fabric.util.animate({
      startValue,
      endValue,
      duration: 200,
      onChange: function(value) {


        polygon.points[index] = Object.assign({}, polygon.points[index])
        polygon.points[index][prop] = value;

//        console.log(index, prop, polygon.points[index][prop]);


        if (prop === 'y') {
          canvas.renderAll();
        }
      },
      onComplete: function() {
        polygon.setCoords();
        resolve()
      }
    }) */
    polygon.points[index] = Object.assign({}, polygon.points[index])
    polygon.points[index][prop] = endValue;
    //canvas.renderAll();
    polygon.setCoords();
    resolve()
    //setTimeout(() => resolve(), 40)

  })

  return Promise.all([
    animatePoint(1, 'x', startPoints[1].x, endPoints[1].x),
    animatePoint(1, 'y', startPoints[1].y, endPoints[1].y)
  ]).then(() => Promise.all([
    animatePoint(2, 'x', endPoints[1].x, endPoints[2].x),
    animatePoint(2, 'y', endPoints[1].y, endPoints[2].y)
  ]))
}


const drawTriangleAt = (x, y, grid, canvas) => {
  return new Promise(async (resolve, reject) => {
    const [s1,s2,s3] = triangle.from(x, y, grid, canvas)

    //console.log(s1, s2, s3);

    const s1c = grid.coordsOf(...s1)
    const s2c = grid.coordsOf(...s2)
    const s3c = grid.coordsOf(...s3)




    const opts = {
      ...triangle.getPolygonZero(s1c, s2c, s3c),
      stroke: 'purple',
      fill: 'transparent',
      // selectable: false,
      // objectCaching: false,
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

    const points = toPolygonPoints(s1c,s2c,s3c)
    const polygon = new fabric.Polygon(
      points,
      opts
    );
    canvas.add(polygon)


    //console.log('A', Object.assign({}, polygon.points));

//    await animate(points[0], points, polygon, canvas)

    //console.log('B', Object.assign({}, polygon.points));

    //resolve([s1,s2,s3])
    setTimeout(() => resolve([s1,s2,s3]), 60)
  })
}



(async function() {
  var canvas = new fabric.Canvas('C', settings.canvas);

  const grid = create(settings.grid.x, settings.grid.y, {
    size: settings.grid.edgeDistance
  })

  // grid.debug(canvas);
  const start = [5,6]
  const notStart = (p) => (p[0] !== start[0] && p[1] !== start[1])

  const asyncDraw = async (prev) => {
    // pick a point from last drawn tringle
    // which is not filled
    let s = pick(
      prev.filter(k => (grid.contentOf(...k).length < 4))
    )

    // no points avail,
    // pick one of the surrounding ones
    if (!s) {
      s = pick(
        grid
          .getSurroundingPoints(...pick(prev.filter(notStart)))
          .filter(notStart)
      )
    }

    try {
      // draw!
      let c = await drawTriangleAt(...s, grid, canvas)

      return c
    } catch (e) {
      // failed to draw, try again
      const s2 = pick(
        grid
          .getSurroundingPoints(...pick(c))
          .filter(notStart)
          .filter(point => (point[0] !== c[0] && point[1] !== c[0]))
      )

      let c = await drawTriangleAt(...s2, grid, canvas)
      return c
    }
  }


  Array(6).fill(0).reduce((P,i) => {
    return P.then(coords => asyncDraw(coords))
  }, drawTriangleAt(...start, grid, canvas))


/*
  Array(6).fill(0).map(async (n, i) => {
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
      c = await drawTriangleAt(...s, grid, canvas)
    } catch (e) {
      // failed to draw, try again
      const s2 = pick(
        grid
          .getSurroundingPoints(...pick(c))
          .filter(notStart)
          .filter(point => (point[0] !== c[0] && point[1] !== c[0]))
      )

      c = await drawTriangleAt(...s2, grid, canvas)
    }
  }) */


})();







/*

  input text
  first N letter
  letter by letter


  each draw is a promise
  chain together with inputs

  triangle calc random func is seeded with input letter,
  passed in to triangle.from

*/
