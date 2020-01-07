import { fabric } from 'fabric'

let i = 0

export default (arr) => {
  i++;
  console.log(i, 'pick random from', Array.from(arr));

  return arr[fabric.util.getRandomInt(0, arr.length-1)]
}
