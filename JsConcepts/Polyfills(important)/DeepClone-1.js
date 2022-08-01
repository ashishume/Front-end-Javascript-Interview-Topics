function cloneDeep(obj, map = new Map()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (map.has(obj)) {
    return map.get(obj);
  }

  const output = Array.isArray(obj) ? [] : {};
  map.set(obj, output);
  const keys = [...Object.getOwnPropertySymbols(obj), ...Object.keys(obj)];

  for (const key of keys) {
    const val = obj[key];
    output[key] = cloneDeep(val, map);
  }

  return output;
}

const obj = {
  a: 55,
  b: {
    age: "value string",
    c: {
      random: "random string",
      d: [1, 2, 6, 7],
    },
  },
};
// const obj2 = obj;
const obj2 = cloneDeep(obj);

//changing the nested values, it wont effect the original object
obj2.b.c.d[0] = "25";

console.log("old", obj);
console.log("new", obj2);
