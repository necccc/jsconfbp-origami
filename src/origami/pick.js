import { fabric } from 'fabric'

export default (arr) => {
  //console.log('pick random from', Array.from(arr));

  return arr[fabric.util.getRandomInt(0, arr.length-1)]
}
