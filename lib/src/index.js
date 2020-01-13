import pick from './pick'
import Grid from './grid'
import settings from './settings'
import drawTriangleAt from './draw'
import getStartPoint from './get-start-point'


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

  const grid = Grid.createInstance(opts.grid.x, opts.grid.y, {
    size: opts.grid.edgeDistance
  })

  if (opts.debug) {
    console.log({
      config: opts
    });
  }

  const start = getStartPoint(opts)

  const notStart = (p) => (p[0] !== start[0] && p[1] !== start[1])

  const asyncDraw = async (previous) => {

    // pick a point from last drawn tringle
    // which is not filled
    let s = opts.random(
      previous.grid.filter(k => (grid.contentOf(...k).length < 4))
    )

    // no points avail,
    // pick one of the surrounding ones
    if (!s) {
      s = opts.random(
        grid
          .getSurroundingPoints(...opts.random(previous.grid.filter(notStart)))
          .filter(notStart)
      )
    }

    try {
      // draw!
      let c = await drawTriangleAt(...s, opts, grid)

      return c
    } catch (e) {
      // failed to draw, try again
      const s2 = opts.random(
        grid
          .getSurroundingPoints(...opts.random(c))
          .filter(notStart)
          .filter(point => (point[0] !== c[0] && point[1] !== c[0]))
      )

      let c = await drawTriangleAt(...s2, opts, grid)
      return c
    }
  }

  const result = []

  return Array(opts.triangles - 1)
    .fill(0)
    .reduce((P, ...args) => {
      const index = args[1]
      return P.then(coords => {
        const final = (index + 1 == opts.triangles - 1);

        result.push(coords)

        if (!final) {
          return asyncDraw(coords)
        }

        return asyncDraw(coords).then(c => {
          result.push(c)
          return result
        })
      })
    }, drawTriangleAt(...start, opts, grid))
}
