const source = {
  a: {
    b: {
      c: {
        d: 44,
        name: "shyam",
      },
    },
    f: {
      j: {
        k: 56,
        city: "Gurgaon",
        skills: ["swimming", "dancing"],
      },
    },
  },
};
// Expected output:
// Output = {
//   d: 44,
//   name: "Shivansh",
//   k: 56,
//   city: "Gurgaon",
// };

function outputMethod(source) {
  let result = {};
  function flattenObject(source) {
    for (key in source) {
      if (key === "d" || key === "name" || key === "city" || key === "k") {
        result[key] = source[key];
      } else if (typeof source[key] === "object") {
        flattenObject(source[key]);
      }
    }
  }
  flattenObject(source);

  return result;
}

console.log(outputMethod(source));
