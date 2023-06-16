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
  const pathArr = path.replaceAll("[", ".").replaceAll("]", "").split(".");
  return helper(obj, pathArr, val);
}

function helper(obj, pathArr, val) {
  const [curr, ...rest] = pathArr;
  if (rest?.length > 0) {
    if (!obj[curr]) {
      const isNumber = `${+rest[0]}` === rest[0];
      obj[curr] = isNumber ? [] : {};
    }
    if (typeof obj[curr] === "object") {
      const isNumber = `${+rest[0]}` === rest[0];
      obj[curr] = helper(isNumber ? [] : {}, rest, val);
    } else {
      obj[curr] = helper(obj[curr], rest, val);
    }
  } else {
    obj[curr] = val;
  }
  console.log(obj);
  return obj;
}
console.log(setObj(obj, pathArr, val));
