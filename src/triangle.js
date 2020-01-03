import Grid from './grid'
import pick from './pick'

const getThirdPoint = (s2, grid, s1) => {
  const points = grid
  .getSurroundingPoints(...s2)
  .filter(point => filterThirdPoint(point, s1, s2, grid))

  if (points.length === 0) throw 'No point avail'

  return points
}

export const from = (x, y, grid, canvas) => {
  const s1 = [x, y]

  const id = Math.round((Math.random() * 1000000)).toString(32)
  // todo not to be so random
  const s2 = [...pick(grid.getSurroundingPoints(x, y))]

  grid.addTo(...s1, [id, 's1', ...s2])

  try {
    const s3 = [...pick(
        getThirdPoint(s2, grid, s1)
      )
    ]

    grid.addTo(...s2, [id, 's2', ...s3])
    grid.addTo(...s3, [id, 's3', ...s1])

    return [s1, s2, s3]
  } catch (e) {
    // find grid points with least members & start over

    const p = pick(grid.getLeastOccupied())
    return from(...p, grid, canvas)
  }
}

const diff = (a1, a2) => {
  return [a1[0] - a2[0], a1[1] - a2[1]]
}

const isUnreachableThird = ([a,b], s1, s2) => {
  const [x,y] = s1

  // no going back to start point
  if (a === x && b === y) return true

  const d = diff(s1, s2)

  if (d[0] === 1 && d[1] === -1) {
    if (x != a) return true
  }

  if (d[0] === 1 && d[1] === 1) {
    if (a < x - 1) return true
    if (b < y - 1 && a < x) return true
  }

  if (d[0] === -1 && d[1] === 1) {
    if (b < y - 2) return true
    if (a > x + 1) return true
    if (a > x && b < y - 1) return true
  }

  if (d[0] === -1 && d[1] === -1) {
    if (a > x + 1) return true
    if (a > x && b > y) return true
  }

  if (d[0] === 0 && d[1] === -2) {
    if (b > y + 1) return true
  }

  if (d[0] === 0 && d[1] === 2) {
    if (b < y - 1) return true
  }

  if (y % 2 === 0) {

    if (d[0] === 0 && d[1] === 1) {
      if (a <= x - 1 && b <= y - 1) return true
      if (b < y - 2) return true
    }
    if (d[0] === 0 && d[1] === -1) {
      if (b > y && a < x) return true
      if (b > y +2) return true
    }
    if (d[0] === -1 && d[1] === 0) {
      if (a > x + 1) return true
      if (b < y - 1 || b > y + 1) return true
    }
    if (d[0] === 1 && d[1] === 0) {
      if (a < x) return true
    }
  } else {
    if (d[0] === 0 && d[1] === 1) {
      if (a > x && b <= y - 1) return true
      if (b < y - 2) return true
    }
    if (d[0] === 0 && d[1] === -1) {
      if (b > y + 2) return true
      if (a >= x + 1 && b >= y + 1) return true
    }
    if (d[0] === -1 && d[1] === 0) {
      if (a >= x + 1) return true
      if ((b < y -1 || b > y + 1)) return true
    }
    if (d[0] === 1 && d[1] === 0) {
      if (a < x - 1) return true
      if (b < y - 1 || b > y + 1) return true
    }
  }

  return false
}

const filterThirdPoint = ([a,b], s1, s2, grid) => {

  if (isUnreachableThird([a,b], s1, s2)) {
    return false
  }

  if (grid.isTriangle(s1, s2, [a,b])) {
    // is already drawn
    return false
  }


  if (Grid.isHypotenuse([a,b], s1)) {
    const [x,y] = s1

    const [
      [xH1, yH1],
      [xH2, yH2]
    ] = Grid.getCrossingHypotenuse([a,b],[x,y])

    const crossing = grid.arePointsConnected([xH1, yH1],[xH2, yH2])

    return !crossing
  } else if (Grid.isHypotenuse([a,b], s2)) {
    const [x,y] = s2

    const [
      [xH1, yH1],
      [xH2, yH2]
    ] = Grid.getCrossingHypotenuse([a,b],[x,y])

    const crossing = grid.arePointsConnected([xH1, yH1],[xH2, yH2])

    return !crossing
  }

  return true
}


export const getPolygonZero = (s1c,s2c,s3c) => {
  return {
    left: Math.min(s1c.x,s2c.x,s3c.x),
    top: Math.min(s1c.y,s2c.y,s3c.y),
  }
}
