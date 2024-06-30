//Lodash get()

let obj = {
  user: {
    name: "Ashish",
    address: {
      place: "Bengaluru",
    },
    phone: [{ primary: 123456789 }, { secondary: 444444444 }],
  },
};

function lodashGet(object, path, defaultValue) {
  if (object === undefined || object === null) {
    return defaultValue;
  }

  const keys = !Array.isArray(path)
    ? path.replaceAll("[", ".").replaceAll("]", "").split(".")
    : path;
  let current = object;

  for (let key of keys) {
    if (current === undefined || current === null) {
      return defaultValue;
    }
    current = current[key];
  }

  return current;
}
// lodashGet(obj, "user.phone[0].primary", "Debnath")
console.log(lodashGet(obj, "user.phone[0].primary", "Debnath"));
console.log(lodashGet(obj, ["user", "address", "place"], "Debnath"));
