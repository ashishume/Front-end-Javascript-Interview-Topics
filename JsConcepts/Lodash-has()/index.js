/** lodash has() */

function LodashHas(object, pathArr) {
  const keys = Array.isArray(pathArr)
    ? pathArr
    : pathArr.replaceAll("[", ".").replaceAll("]", "").split(".");

  let current = object;

  for (let key of keys) {
    if (!current || !current.hasOwnProperty(key)) {
      return false; // If the current object is null/undefined or does not have the key, return false
    }
    current = current[key]; // Move to the next nested object
  }
  return true;
}

let obj = {
  user: {
    name: "Ashish",
    address: {
      place: "Bengaluru",
    },
    phone: [{ primary: 123456789 }, { secondary: 444444444 }],
  },
};

console.log(LodashHas(obj, "user.address.place")); // true
console.log(LodashHas(obj, ["user", "address", "place", "x"])); // false
