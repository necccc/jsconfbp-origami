import { fabric } from 'fabric'
import pick from './pick'
import Grid from './grid'
import settings from './settings'
import drawTriangleAt from './draw'
import getStartPoint from './get-start-point'

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


const textBasedRandom = (text) => {
  let index = 0
  let counter = 0

  return (array) => {
    const rand = text.charCodeAt(index) % array.length

    if (counter % 2 === 0) {
      index += 1
    }
    counter += 1

    if (!array[rand]) return pick(array)

    return array[rand]
  }
}

export default async function (options) {
  const opts = Object.assign({}, settings, options, {
    random: pick,
    canvas: Object.assign({}, settings.canvas, options.canvas || {}),
    grid: Grid.createConfig(options)
  })

  if (opts.fromText) {
    opts.random = textBasedRandom(opts.fromText)
  }

  if (opts.triangles && opts.fromText && (opts.fromText.length / 2) < opts.triangles) {
    opts.triangles = Math.floor((opts.fromText.length) / 2)
  }

  if (!opts.triangles) {
    opts.triangles = Math.floor((opts.fromText.length) / 2) - 1
  }

  const C = document.createElement('canvas')
  const canvas = new fabric.Canvas(C, opts.canvas);

  const grid = Grid.createInstance(opts.grid.x, opts.grid.y, {
    size: opts.grid.edgeDistance
  })

  if (opts.debug) {
    console.log({
      config: opts
    });

    grid.debug(canvas)
  }

  const start = getStartPoint(opts)

  const notStart = (p) => (p[0] !== start[0] && p[1] !== start[1])

  const asyncDraw = async (prev) => {
    // pick a point from last drawn tringle
    // which is not filled
    let s = opts.random(
      prev.filter(k => (grid.contentOf(...k).length < 4))
    )

    // no points avail,
    // pick one of the surrounding ones
    if (!s) {
      s = opts.random(
        grid
          .getSurroundingPoints(...opts.random(prev.filter(notStart)))
          .filter(notStart)
      )
    }

    try {
      // draw!
      let c = await drawTriangleAt(...s, opts, grid, canvas)

      return c
    } catch (e) {
      // failed to draw, try again
      const s2 = opts.random(
        grid
          .getSurroundingPoints(...opts.random(c))
          .filter(notStart)
          .filter(point => (point[0] !== c[0] && point[1] !== c[0]))
      )

      let c = await drawTriangleAt(...s2, opts, grid, canvas)
      return c
    }
  }

  await Array(opts.triangles - 1).fill(0).reduce((P,i) => {
    return P.then(coords => asyncDraw(coords))
  }, drawTriangleAt(...start, opts, grid, canvas))


  return canvas.toSVG()
}

/*
TODO
  input text
  first N letter
  letter by letter


  each draw is a promise
  chain together with inputs

  triangle calc random func is seeded with input letter,
  passed in to triangle.from

*/
