function findValueFromNestedObject(currObj, path) {
  const keys = path.split(".");

  let curr = currObj;
  for (let key of keys) {
    if (curr == null || !(key in curr)) {
      return undefined;
    }
    curr = curr[key];
  }
  return curr;
}

const obj = {
  A: {
    B: {
      C: {
        D: {
          E: 2,
        },
      },
    },
  },
};

console.log(findValueFromNestedObject(obj, "A.B.C.D.E"));
// return 2 as answer if E exists else return undefined
