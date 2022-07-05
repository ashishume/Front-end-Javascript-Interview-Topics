const tar = {
  a: 1,
  b: "targetValue",
  c: ["1", 2, 3],
};
const sour = {
  a: 5,
  b: [1, 1, 1, 1],
  d: { sa: "sourceValue" },
};

const ObjectAssign = function (target, ...sources) {
  let newObj = Object(target);
  for (let i = 0; i < sources.length; i++) {
    let nextSource = sources[i];
    if (nextSource !== null && nextSource !== undefined) {
      for (let nextKey in nextSource) {
        /** loop through source object */
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          newObj[nextKey] = nextSource[nextKey];
        }
      }
      /** edge case to solve symbols as key property */
      for (let symbol of Object.getOwnPropertySymbols(nextSource)) {
        newObj[symbol] = nextSource[symbol];
      }
    }
  }

  return newObj;
};
const key = Symbol("a");
const a = ObjectAssign({}, { [key]: 3 }, { b: 4 });
console.log("custom===>", a);
console.log("inbuilt==>", Object.assign({}, { [key]: 3 }, { b: 4 }));