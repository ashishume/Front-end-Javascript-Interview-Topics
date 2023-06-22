const source = {
  x: "a",
  y: "b",
  z: "a",
};
const output = {
  a: ["x", "z"],
  b: ["y"],
};

function generateOutput(source) {
  let res = {};
  for (let key in source) {
    if (res[source[key]]?.length) {
      res[source[key]].push(key);
    } else {
      res[source[key]] = [key];
    }
  }
  return res;
}

console.log(generateOutput(source));
