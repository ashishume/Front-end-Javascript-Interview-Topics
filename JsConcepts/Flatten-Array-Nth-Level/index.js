/** Flatten the array by one level */
const arr = [1, 2, 3, [5, 7, 8, [4, 8, 5]]];
const newArr = [].concat(...arr);
// console.log(newArr);

/** Flatten the array by more than 1 levels */
function FlattenMultiLevelArray(value) {
  let result = [];
  for (let i = 0; i < value.length; i++) {
    if (Array.isArray(value[i])) {
      result = result.concat(FlattenMultiLevelArray(value[i]));
    } else {
      result.push(value[i]);
    }
  }
  return result;
}
const levelArr = [1, 2, 3, [5, 7, 8, [4, 8, 5, [1, 2]]]];
const res = FlattenMultiLevelArray(levelArr); // Infinity to add N no. of flatten
//depth is optional the function can work even without depth(just remove the depth, or provide Infinity to the args)

// console.log(res);

const a = [1, 2, 3];
const b = [2, 3, 4, [6, 6, 6]];

console.log(a.concat(...b));
