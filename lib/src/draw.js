import * as triangle from './triangle'

const toPolygonPoints = (...corners) => corners.reduce((arr, points) => {
  arr.push(points)
  return arr
}, [])


export default (x, y, options, grid) => {

  const pickColor = (colors) => options.random(colors)

  return new Promise(async resolve => {
    const [s1,s2,s3] = triangle.from(x, y, options, grid)

    const s1c = grid.coordsOf(...s1)
    const s2c = grid.coordsOf(...s2)
    const s3c = grid.coordsOf(...s3)

//    const opts = {
//      ...triangle.getPolygonZero(s1c, s2c, s3c),
//      stroke: 'purple',
//      fill: 'transparent',
//      selectable: false,
//      objectCaching: false,
//    }

    const color = pickColor(options.colors)
    const points = toPolygonPoints(s1c,s2c,s3c)

    resolve({
      color,
      grid: [s1,s2,s3],
      points,
    })
  })
}
