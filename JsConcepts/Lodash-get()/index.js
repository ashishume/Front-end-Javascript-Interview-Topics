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

  const paths = !Array.isArray(path)
    ? path.replaceAll("[", ".").replaceAll("]", "").split(".")
    : path;
  let current = object;

  for (let i = 0; i < paths.length; i++) {
    if (current === undefined || current === null) {
      return defaultValue;
    }
    current = current[paths[i]];
  }

  return current;
}
lodashGet(obj, "user.phone[0].primary", "Debnath")
// console.log(lodashGet(obj, "user.phone[0].primary", "Debnath"));
// console.log(lodashGet(obj, ["user", "phone", "0", "primary"], "Debnath"));
