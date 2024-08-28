/** Flatten the array by one level */
const arr = [1, 2, 3, [5, 7, 8, [4, 8, 5]]];
const newArr = [].concat(...arr);
// console.log(newArr);

/** Flatten the array by more than 1 levels */
function FlattenMultiLevelArray(arr, depth = 1) {
  let result = [];
  arr.forEach((value) => {
    if (Array.isArray(value) && depth > 0) {
      result.push(...FlattenMultiLevelArray(value, depth - 1));
    } else result.push(value);
  });

  return result;
}
const levelArr = [1, 2, 3, [5, 7, 8, [4, 8, 5, [1, 2]]]];
const res = FlattenMultiLevelArray(levelArr, 4);  // Infinity to add N no. of flatten
//depth is optional the function can work even without depth(just remove the depth, or provide Infinity to the args)

// console.log(res);

const a = [1, 2, 3];
const b = [2, 3, 4, [6, 6, 6]];

console.log(a.concat(...b));
