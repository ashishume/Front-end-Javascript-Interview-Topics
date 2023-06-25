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

function createObject(obj) {
  let res = {};
  function helper(obj, merger = "") {
    for (let key in obj) {
      const newKey = merger ? `${merger}.${key}` : key;

      if (typeof obj[key] !== "object") {
        res[newKey] = obj[key];
      } else {
        helper(obj[key], newKey);
      }
    }
    return res;
  }
  helper(obj);
  return res;
}

console.log(createObject(obj));
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
