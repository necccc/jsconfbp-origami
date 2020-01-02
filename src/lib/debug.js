export const renderSurrounding = (arr, grid, canvas) => {
  arr.forEach(([a,b]) => {
    const {x,y} = grid.coordsOf(a,b)
    canvas.add(new fabric.Circle({
      top: y -2,
      left: x -2,
      radius: 2,
      fill: 'cyan'
    }))
  })
}

export const showSurroundings = (X,Y, grid, canvas) => {
  renderSurrounding(grid.getSurroundingPoints(X, Y), grid, canvas)
}
