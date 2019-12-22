import { fabric } from 'fabric'

import pick from './pick'


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

export const from = (x, y, grid, canvas) => {
  const s1 = [x, y]

  const id = Math.round((Math.random() * 1000000)).toString(32)

  // todo not to be so random
  const s2 = [...pick(grid.getSurroundingPoints(x, y))]

  grid.addTo(...s1, [id, ...s2])

  const s3 = [...pick(grid
    .getSurroundingPoints(...s2)
    .filter(point => filterThirdPoint(point, s1, s2)))
  ]
  grid.addTo(...s2, [id, ...s3])
  grid.addTo(...s3, [id, ...s1])

  return [s1, s2, s3]
}


const diff = (a1, a2) => {
  return [a1[0] - a2[0], a1[1] - a2[1]]
}


const filterThirdPoint = ([a,b], s1, s2) => {
  const [x,y] = s1

  // no going back to start point
  if (a === x && b === y) return false

  const d = diff(s1, s2)

  //console.log(d);
  //console.log(s1, s2, [a,b]);

  if (d[0] === 1 && d[1] === -1) {
    if (x != a) return false
  }

  if (d[0] === 1 && d[1] === 1) {
    if (a < x - 1) return false
    if (b < y - 1 && a < x) return false
  }

  if (d[0] === -1 && d[1] === 1) {
    if (b < y - 2) return false
    if (a > x + 1) return false
    if (a > x && b < y - 1) return false
  }

  if (d[0] === -1 && d[1] === -1) {
    if (a > x + 1) return false
    if (a > x && b > y) return false
  }

  if (d[0] === 0 && d[1] === -2) {
    if (b > y + 1) return false
  }

  if (d[0] === 0 && d[1] === 2) {
    if (b < y - 1) return false
  }

  if (y % 2 === 0) {

    if (d[0] === 0 && d[1] === 1) {
      if (a <= x - 1 && b <= y - 1) return false
      if (b < y - 2) return false
    }
    if (d[0] === 0 && d[1] === -1) {
      if (b > y && a < x) return false
      if (b > y +2) return false
    }
    if (d[0] === -1 && d[1] === 0) {
      if (a > x + 1) return false
      if (b < y - 1 || b > y + 1) return false
    }
    if (d[0] === 1 && d[1] === 0) {
      if (a < x) return false
    }
  } else {
    if (d[0] === 0 && d[1] === 1) {
      if (a > x && b <= y - 1) return false
      if (b < y - 2) return false
    }
    if (d[0] === 0 && d[1] === -1) {
      if (b > y + 2) return false
      if (a >= x + 1 && b >= y + 1) return false
    }
    if (d[0] === -1 && d[1] === 0) {
      if (a >= x + 1) return false
      if ((b < y -1 || b > y + 1)) return false
    }
    if (d[0] === 1 && d[1] === 0) {
      if (a < x - 1) return false
      if (b < y - 1 || b > y + 1) return false
    }
  }

  return true
}


export const getPolygonZero = (s1c,s2c,s3c) => {
  return {
    left: Math.min(s1c.x,s2c.x,s3c.x),
    top: Math.min(s1c.y,s2c.y,s3c.y),
  }
}
