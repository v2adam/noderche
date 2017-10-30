const numbers = [2,4,1,5,4,1,3]

function isBiggerThanTwo(num){
  return num > 2
}

console.log(numbers.filter(isBiggerThanTwo))