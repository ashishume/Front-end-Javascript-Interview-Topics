const obj = {
  name: "Ashish",
  age: 24,
  personal: {
    phone: 8557098095,
    official: {
      company: "Soroco",
    },
  },
};

console.log("OLD: ", JSON.stringify(obj));
function stringify(obj) {
  let result = "";

  result += "{";

  const lastKey = Object.keys(obj).pop();

  for (let key in obj) {
    const value = obj[key];
    result += `"${key}":`;

    if (typeof value === "string") {
      result += `"${obj[key]}"`;
    } else if (typeof value === "number") {
      result += `${obj[key]}`;
    } else if (typeof value === "object") {
      result += `${stringify(value)}`;
    }
    if (lastKey !== key) result += ",";
  }
  result += "}";
  return result;
}

console.log("NEW :", stringify(obj));
