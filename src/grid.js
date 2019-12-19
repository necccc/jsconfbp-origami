const grids = {}
const defaultOptions = {
  name: 'defaultGrid',
  size: 32,
}

export const create = (x, y, options) => {
  const opt = Object.assign({}, defaultOptions, options)
  const g = new Grid(x, y, opt)
  grids[name] = g
  return g
}

export const get = (name = 'defaultGrid') => {
  if (!grids[name]) throw `No such Grid as "${name}"`

  return grids[name]
}

export class Grid {

  #grid = [];
  #options = {};

  constructor (x, y, options) {
    this.name = options.name
    this.x = x
    this.y = y
    this.#options = options
    this.#grid = new Array(x).fill(new Array(y).fill([]));
  }

  * all() {
    let y = 0

    for (y ; y < this.y ; y++) {
      let x = 0

      for (x;x < this.x; x++) {
        yield this.coordsOf(x,y)
      }
    }
  }

  coordsOf(x, y) {
    const { size } = this.#options
    const distance = Math.sqrt(2 * (size ** 2))

    return {
      x: (distance + (x * distance)) - (distance * 0.5 * (y % 2)),
      //x: (distance + (x * distance)),
      y: (distance / 2) + (y * (distance / 2)),
    }
  }

  getSurroundingPoints(x, y) {
    const result = []

    if (y - 2 >= 0) {
      result.push([x, y - 2])
    }

    if (x + 1 < this.x) {
      result.push([x + 1, y])
    }

    if (y + 2 < this.y) {
      result.push([x, y + 2])
    }

    if (x - 1 >= 0) {
      result.push([x - 1, y])
    }

    if (y % 2 === 0) {
      if (y - 1 >= 0 && x + 1 < this.x) {
        result.push([x + 1, y - 1])
      }
      if (y + 1 < this.y && x + 1 < this.x) {
        result.push([x + 1, y + 1])
      }
      if (y + 1 < this.y) {
        result.push([x, y + 1])
      }
      if (y - 1 >= 0) {
        result.push([x, y - 1])
      }
    } else {
      if (y - 1 >= 0 ) {
        result.push([x, y - 1])
      }
      if (y + 1 < this.y) {
        result.push([x, y + 1])
      }

      if (y + 1 < this.y && x - 1 >= 0) {
        result.push([x - 1, y + 1])
      }
      if (y - 1 >= 0 && x - 1 >= 0) {
        result.push([x - 1, y - 1])
      }
    }

    return result
  }
}
