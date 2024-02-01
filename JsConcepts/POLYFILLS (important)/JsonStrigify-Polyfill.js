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
  someData: {
    [Symbol(5)]: "random data",
  },
  randomFunction: (value) => {
    return "random string";
  },
};

console.log("INBUILT: ", JSON.stringify(obj));

/** NOTE: other way to find out type of argument is
 *
 * data.constructor===Object
 * data.constructor===function
 */

function stringify(data) {
  if (typeof data === "bigint") throw new Error("Do not know how to serialize a BigInt at JSON.stringify");
  if (typeof data === "string") return `"${data}"`;
  if (typeof data === "function") return undefined;
  if (data !== data) return "null";
  if (data === Infinity) return "null";
  if (data === -Infinity) return "null";
  if (typeof data === "number") return `${data}`;
  if (typeof data === "boolean") return `${data}`;
  if (data === null) return "null";
  if (data === undefined) return "null";
  if (typeof data === "symbol") return "null";
  if (data instanceof Date) return `"${data.toISOString()}"`;
  if (Array.isArray(data)) {
    const arr = data.map((el) => stringify(el));
    return `[${arr.join(",")}]`;
  }
  if (typeof data === "object") {
    const arr = Object.entries(data).reduce((acc, [key, value]) => {
      if (value === undefined || typeof value === "function") {
        return acc;
      }
      acc.push(`"${key}":${stringify(value)}`);
      return acc;
    }, []);
    return `{${arr.join(",")}}`;
  }
}

console.log("CUSTOM :", stringify(obj));

console.log("is equal", stringify(obj) === JSON.stringify(obj));
