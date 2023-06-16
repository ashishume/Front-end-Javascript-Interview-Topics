const path = "a[0].b.c";
// find the value given path array above:
const obj = {
  a: [
    {
      b: {
        c: [1, 2, 4],
      },
    },
  ],
};

function setObj(obj, path) {
  const keys = path.replaceAll("[", ".").replaceAll("]", "").split(".");
  return keys.reduce((obj, key) => obj[key], obj);
}

console.log(setObj(obj, path));
