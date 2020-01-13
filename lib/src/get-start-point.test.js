import getStartPoint from './get-start-point'

const opts = {
  grid: {
    x: 16,
    y: 11
  }
}

describe('get-start-point', () => {

  it('from top left', () => {
    const result = getStartPoint(Object.assign({}, opts, { start: 'top left' }))
    expect(result).toMatchObject([0, 0])
  })

  it('from top right', () => {
    const result = getStartPoint(Object.assign({}, opts, { start: 'top right' }))
    expect(result).toMatchObject([15, 0])
  })

  it('from bottom right', () => {
    const result = getStartPoint(Object.assign({}, opts, { start: 'bottom right' }))
    expect(result).toMatchObject([15, 10])
  })

  it('from bottom left', () => {
    const result = getStartPoint(Object.assign({}, opts, { start: 'bottom left' }))
    expect(result).toMatchObject([0, 10])
  })

  it('from bottom center', () => {
    const result = getStartPoint(Object.assign({}, opts, { start: 'bottom center' }))
    expect(result).toMatchObject([8, 10])
  })

  it('from top center', () => {
    const result = getStartPoint(Object.assign({}, opts, { start: 'top center' }))
    expect(result).toMatchObject([8, 0])
  })

  it('from left center', () => {
    const result = getStartPoint(Object.assign({}, opts, { start: 'left center' }))
    expect(result).toMatchObject([0, 5])
  })

  it('from right center', () => {
    const result = getStartPoint(Object.assign({}, opts, { start: 'right center' }))
    expect(result).toMatchObject([15, 5])
  })

  it('from center center', () => {
    const result = getStartPoint(Object.assign({}, opts, { start: 'center center' }))
    expect(result).toMatchObject([8, 5])
  })
})
