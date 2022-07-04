const obj = {
  name: "Ashish",
  age: 24,
  personal: {
    phone: 8557098095,
    official: {
      company: "Soroco",
      codes: [1, 2, 4, "one", "two"],
    },
  },
};

console.log("OLD: ", JSON.stringify(obj));

function stringify(data) {
  if (data === undefined) return undefined;
  if (data === null) return "null";
  if (data.toString() === "NaN") return "null";
  if (data === Infinity) return "null";
  if (data.constructor === String) return '"' + data.replace(/"/g, '\\"') + '"';
  if (data.constructor === Number) return String(data);
  if (data.constructor === Boolean) return data ? "true" : "false";
  if (data.constructor === Array)
    return (
      "[" +
      data
        .reduce((acc, v) => {
          if (v === undefined || v === NaN || v === Infinity) return [...acc, "null"];
          else return [...acc, stringify(v)];
        }, [])
        .join(",") +
      "]"
    );
  if (data.constructor === Object)
    return (
      "{" +
      Object.keys(data)
        .reduce((acc, k) => {
          if (data[k] === undefined) return acc;
          else return [...acc, stringify(k) + ":" + stringify(data[k])];
        }, [])
        .join(",") +
      "}"
    );

  return "{}";
}

console.log("NEW :", stringify(obj));
