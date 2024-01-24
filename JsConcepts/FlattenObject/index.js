let obj = {
  Company: "GeeksforGeeks",
  Address: "Noida",
  contact: +91999999999,
  mentor: {
    HTML: "GFG",
    CSS: "GFG",
    JavaScript: "GFG",
    abc: {
      xyz: 1,
    },
  },
};

function flattenObject(object, merger = "", result = {}) {
  for (let key in object) {
    const newKey = merger ? `${merger}.${key}` : key;
    if (typeof object[key] === "object" && object[key]) {
      flattenObject(object[key], newKey, result);
    } else {
      result[newKey] = object[key];
    }
  }
  return result;
}

console.log(flattenObject(obj));
// expected output:
// {
//     Company: 'GeeksforGeeks',
//     Address: 'Noida',
//     contact: -999999908,
//     'mentor.HTML': 'GFG',
//     'mentor.CSS': 'GFG',
//     'mentor.JavaScript': 'GFG',
//     'mentor.abc.xyz': 1
//   }
