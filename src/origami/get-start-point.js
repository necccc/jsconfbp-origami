
const hasCenter = (str) => str.includes('center')

export default (opts) => {

  const { start, grid } = opts
  const result = [0, 0]

  if (typeof start === 'string') {
    if (start.includes('top')) {
      result[1] = 0
    } else if (start.includes('bottom')) {
      result[1] = grid.y - 1
    }

    if ((start.includes('top') || start.includes('bottom')) && hasCenter(start)) {
      result[0] = Math.floor(grid.x / 2)
    }

    if (start.includes('left')) {
      result[0] = 0
    } else if (start.includes('right')) {
      result[0] = grid.x - 1
    }

    if (start.includes('left') || start.includes('right') && hasCenter(start)) {
      result[1] = Math.floor(grid.y / 2)
    }

    if (result === 'center center') {
      result[0] = Math.floor(grid.x / 2)
      result[1] = Math.floor(grid.y / 2)
    }
  }

  return result
}
