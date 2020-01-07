import { fabric } from 'fabric'
import * as triangle from './triangle'

const toPolygonPoints = (...corners) => corners.reduce((arr, points) => {
  arr.push(points)
  return arr
}, [])


export default (x, y, options, grid, canvas) => {

  const pickColor = (colors) => options.random(colors)

  return new Promise(async (resolve, reject) => {
    const [s1,s2,s3] = triangle.from(x, y, options, grid, canvas)

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
        blur: .25,
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
