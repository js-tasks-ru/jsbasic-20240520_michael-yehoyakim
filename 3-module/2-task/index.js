/*
function filterRange(arr, a, b) {
  const filteredArray = [];
  for (const number of arr) {
    if (number >= a && number <=b) {
      filteredArray.push(number);
    }
  }

  return filteredArray;
}
*/

function filterRange(arr, a, b) {
  return arr.filter(item => item >= a && item <= b);
}


let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

console.log( filtered ); // [3,1] (совпадающие значения)
console.log( arr ); // [5,3,8,1] (без изменений)
