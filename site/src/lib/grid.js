import settings from './settings'

const grids = {}
const defaultOptions = {
  name: 'defaultGrid',
  size: 32,
}

export default class Grid {

  #debug = false;
  #grid = [];
  #options = {};

  constructor (x, y, options) {
    this.name = options.name
    this.x = x
    this.y = y
    this.#options = options
    this.#grid = new Array(x).fill().map(() => new Array(y).fill().map(() => []));
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

  * values() {
    let y = 0

    for (y ; y < this.y ; y++) {
      let x = 0

      for (x;x < this.x; x++) {
        yield {
          x,
          y,
          value: this.#grid[x][y]
        }
      }
    }
  }

  contentOf(x, y) {
    return this.#grid[x][y]
  }

  coordsOf(x, y) {
    const { size } = this.#options
    const distance = Math.sqrt(2 * (size ** 2))

    return {
      x: (distance + (x * distance)) - (distance * 0.5 * (y % 2)),
      y: (distance / 2) + (y * (distance / 2)),
      __coords: [x,y]
    }
  }

  findPointingTo(x, y) {
    const entries = this.values()
    const results = []

    for(const entry of entries) {
      if (entry.value.length > 0 && entry.value.find(e => (e[2] === x && e[3] === y))) {
        results.push([entry.x, entry.y])
      }
    }
    return results
  }

  addTo(x, y, data) {
    if (this.#grid[x][y].length === 0) {
      this.#grid[x][y] = []
    }
    this.#grid[x][y].push(data)
  }

  getLeastOccupied() {
    const entries = this.values()
    const results = []

    for(const entry of entries) {
      if (entry.value.length === 1) {
        results.push([entry.x, entry.y])
      }
    }
    return results
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


    const points = result
      .filter(coords => this.contentOf(...coords).length < 4)
      .filter(coords => {
        const [x1,y1] = [x,y]
        const [x2,y2] = coords

        // check if it crosses another existing hypotenuse
        if (Grid.isHypotenuse([x1,y1],[x2,y2])) {
          const [
            [xH1, yH1],
            [xH2, yH2]
          ] = Grid.getCrossingHypotenuse([x1,y1],[x2,y2])

          const crossing = this.arePointsConnected([xH1, yH1],[xH2, yH2])

          return !crossing
        }

        return true
      })

      if(this.#debug) {
        console.log(`found surrounding points for ${x}, ${y}`, points);
      }

    return points
  }

  arePointsConnected([xH1, yH1],[xH2, yH2]) {
    const to1 = this.findPointingTo(xH1, yH1)
    const to2 = this.findPointingTo(xH2, yH2)

    return !!to1.find(a => (a[0] === xH2 && a[1] === yH2))
      || !!to2.find(a => (a[0] === xH1 && a[1] === yH1))
  }

  isTriangle (s1, s2, s3) {
    const a1 = this.contentOf(...s1)
    const a2 = this.contentOf(...s2)
    const a3 = this.contentOf(...s3)

    // collect groups affiliated with s1
    const ids = a1.filter(item => (
      (item[2] === s2[0] && item[3] === s2[1]) ||
      (item[2] === s3[0] && item[3] === s3[1]))
    ).reduce((obj, item) => {

      if (obj[item[0]]) {
        obj[item[0]].push([item[2],item[3]])
        return obj
      }

      return Object.assign({}, obj, {[item[0]]: [[item[2],item[3]]]})
    }, {})

    // collect points for found groups
    const triangles = Object.keys(ids).reduce((obj, id) => {
      const p = [...a2, ...a3]
        .filter(item => item[0] === id)
        .map(item => [item[2],item[3]])

      obj[id] = [...obj[id], ...p]
      return obj
    }, ids)

    // check if any group contains all three coords (s1, s2, s3)
    const is_triangle = Object.values(triangles).reduce((bool, points) => {
      if (bool) return bool

      if (points.length < 3) return false

      return points.reduce((b,p) => {
        if (!b) return b
        return s1.join(',') === p.join(',') ||
        s2.join(',') === p.join(',') ||
        s3.join(',') === p.join(',')
      }, true)
    }, false)

    return is_triangle
  }

  debug() {
    this.#debug = true
  }

  static getCrossingHypotenuse([x1,y1],[x2,y2]) {
    // horizontal or vertical
    let xH1, xH2, yH1, yH2

    if (y1 === y2) { // horizontal
      if (y1 % 2 === 0) {
        if (x1 < x2) {
          xH1 = x1 + 1
          yH1 = y1 - 1
          xH2 = x2
          yH2 = y2 + 1
        } else {
          xH1 = x1
          yH1 = y1 + 1
          xH2 = x2 + 1
          yH2 = y2 - 1
        }
      } else {
        if (x1 < x2) {
          xH1 = x1
          yH1 = y1 - 1
          xH2 = x2 - 1
          yH2 = y2 + 1
        } else {
          xH1 = x1 - 1
          yH1 = y1 + 1
          xH2 = x2
          yH2 = y2 - 1
        }
      }
    } else { // vertical
      if (y1 % 2 === 0) {
        if (y1 < y2) {
          xH1 = x1 + 1
          yH1 = y1 + 1
          xH2 = x2
          yH2 = y2 - 1
        } else {
          xH1 = x1
          yH1 = y1 - 1
          xH2 = x2 + 1
          yH2 = y2 + 1
        }
      } else {
        if (y1 < y2) {
          xH1 = x1
          yH1 = y1 + 1
          xH2 = x2 - 1
          yH2 = y2 - 1
        } else {
          xH1 = x1 - 1
          yH1 = y1 - 1
          xH2 = x2
          yH2 = y2 + 1
        }
      }
    }
    return [[xH1, yH1], [xH2, yH2]]
  }

  static isHypotenuse([x1,y1], [x2,y2]) {
    const result = (x1 === x2 && y1 === y2 + 2) ||
    (x1 === x2 && y2 === y1 + 2) ||
    (y1 === y2 && x1 === x2 + 1 ) ||
    (y1 === y2 && x2 === x1 + 1 )

    return result
  }

  static createConfig (opts) {
    const canvas = Object.assign({}, settings.canvas, opts.canvas || {})
    const cfg = Object.assign({}, settings.grid, opts.grid || {})

    if (!cfg.x || !cfg.y) {
      cfg.x = Math.round(canvas.width / Math.sqrt(2 * (cfg.edgeDistance ** 2)))
      cfg.y = Math.round(canvas.height / cfg.edgeDistance) - 1
    }

    return cfg
  }

  static createInstance (x, y, options) {
    const opt = Object.assign({}, defaultOptions, options)
    const g = new Grid(x, y, opt)
    grids[opt.name] = g
    return g
  }

  static getInstance (name = 'defaultGrid') {
    if (!grids[name]) throw `No such Grid as "${name}"`

    return grids[name]
  }
}
