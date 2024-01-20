const pathArr = "a[0].b.c";
const val = 4;

const obj = {};

// expected output :
// const x = {
//   a: [
//     {
//       b: {
//         c: 4,
//       },
//     },
//   ],
// };

function setObj(obj, path, val) {
  /* remove all the brackets and  replace them with dot(.) */
  const pathArr = path.replaceAll("[", ".").replaceAll("]", "").split("."); // ["a","0","b","c"]
  return helper(obj, pathArr, val);
}

function helper(obj, pathArr, val) {
  /** get the current value and spread the remaing array values */
  const [curr, ...rest] = pathArr;
  if (rest?.length > 0) {
    /** if current obj doesnt exist then create one, if number then array else object */
    if (!obj[curr]) {
      // `{+rest[0]} converts the string to numeric value
      const isNumber = `${+rest[0]}` === rest[0];
      obj[curr] = isNumber ? [] : {};
    }

    /** if current object is already present then, call helper recursively */
    if (typeof obj[curr] === "object") {
      const isNumber = `${+rest[0]}` === rest[0];
      obj[curr] = helper(isNumber ? [] : {}, rest, val);
    } else {
      obj[curr] = helper(obj[curr], rest, val);
    }
  } else {
    obj[curr] = val;
  }
  // console.log(obj);
  return obj;
}
console.log(setObj(obj, pathArr, val));
