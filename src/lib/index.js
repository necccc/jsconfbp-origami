import { fabric } from 'fabric'
import pick from './pick'
import { create, get } from './grid'
import * as triangle from './triangle'
import settings from './settings'

const pickColor = (colors) => pick(colors)

const toPolygonPoints = (...corners) => corners.reduce((arr, points) => {
  arr.push(points)
  return arr
}, [])

/*
const animate = (startPoint, endPoints, polygon, canvas) => {
  const startPoints = [startPoint,startPoint,startPoint]

  const animatePoint = (index, prop, startValue, endValue) => new Promise((resolve, reject) => {
    polygon.points[index] = Object.assign({}, polygon.points[index])
    polygon.points[index][prop] = endValue;
    canvas.renderAll();
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
 */

const drawTriangleAt = (x, y, options, grid, canvas) => {
  return new Promise(async (resolve, reject) => {
    const [s1,s2,s3] = triangle.from(x, y, grid, canvas)

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

    if (opts.fill) {
      const color = pickColor(options.colors)
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
      opts.stroke = pickColor(options.colors)
    }

    const points = toPolygonPoints(s1c,s2c,s3c)
    const polygon = new fabric.Polygon(
      points,
      opts
    );

    canvas.add(polygon)
    resolve([s1,s2,s3])
    //setTimeout(() => resolve([s1,s2,s3]), 60)
  })
}

export default async function (options) {
  const opts = Object.assign({}, settings, options)

  const canvas = new fabric.Canvas('C', opts.canvas);

  const grid = create(opts.grid.x, opts.grid.y, {
    size: opts.grid.edgeDistance
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
      let c = await drawTriangleAt(...s, opts, grid, canvas)

      return c
    } catch (e) {
      // failed to draw, try again
      const s2 = pick(
        grid
          .getSurroundingPoints(...pick(c))
          .filter(notStart)
          .filter(point => (point[0] !== c[0] && point[1] !== c[0]))
      )

      let c = await drawTriangleAt(...s2, opts, grid, canvas)
      return c
    }
  }

  await Array(6).fill(0).reduce((P,i) => {
    return P.then(coords => asyncDraw(coords))
  }, drawTriangleAt(...start, opts, grid, canvas))

  return canvas.toSVG()
}

/*

  input text
  first N letter
  letter by letter


  each draw is a promise
  chain together with inputs

  triangle calc random func is seeded with input letter,
  passed in to triangle.from

*/
