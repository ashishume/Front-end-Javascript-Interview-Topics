/**
 * Given an object make the keys as values and values as keys.
Definitely have to handle duplicates and make an assumption that it's values are only String, Must use .reduce()
 */
const obj = {
  key1: "value1",
  key2: "value2",
  key3: "value1",
  key4: "value3",
};

/** invert an object using array.reduce() */
function invertObject(obj) {
  return Object.entries(obj).reduce((result, [key, value]) => {
    // If the value already exists as a key in the result object
    // Convert it to an array if it's not already one, and add the new key
    if (result.hasOwnProperty(value)) {
      if (!Array.isArray(result[value])) {
        result[value] = [result[value], key];
      } else {
        result[value].push(key);
      }
    } else {
      // Otherwise, create a new entry with the swapped key-value pair
      result[value] = key;
    }
    return result;
  }, {});
}

console.log(obj); // original object
console.log(invertObject(obj)); //inverted
/**
  {
    "value1": [
        "key1",
        "key3"
    ],
    "value2": "key2",
    "value3": "key4"
}
 */
