function cloneDeep(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    const newArray = [];
    for (let i = 0; i < obj.length; i++) {
      newArray[i] = cloneDeep(obj[i]);
    }
    return newArray;
  }
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = cloneDeep(obj[key]);
    }
  }
  return newObj;
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
