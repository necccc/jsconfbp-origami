import { fabric } from 'fabric'

export default (arr) => arr[fabric.util.getRandomInt(0, arr.length-1)]
