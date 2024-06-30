/** 
 * lodash pick()
 * Create a new object by picking some keys  */

function LodashPick(object, keys) {
  if (!object || typeof object !== "object") {
    return {}; // If object is not provided or is not an object, return an empty object
  }
  const result = {};

  for (let key of keys) {
    let currentObj = object;
    const keyParts = key.split("."); // Split the key by dot to handle nested properties
    let nestedResult = result;

    for (let i = 0; i < keyParts.length; i++) {
      const keyPart = keyParts[i];
      if (
        currentObj &&
        typeof currentObj === "object" &&
        currentObj.hasOwnProperty(keyPart)
      ) {
        currentObj = currentObj[keyPart]; // Traverse nested properties if the property exists
        if (i === keyParts.length - 1) {
          nestedResult[keyPart] = currentObj; // Set the final property in the result object
        } else {
          nestedResult[keyPart] = nestedResult[keyPart] || {}; // Create nested object if it doesn't exist
          nestedResult = nestedResult[keyPart]; // Move to the next nested level
        }
      } else {
        break; // If any intermediate property is undefined or does not exist, break
      }
    }
  }

  return result;
}

// Example usage
const sourceObject = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    zip: "10001",
    details: {
      street: "123 Main St",
      country: "USA",
    },
  },
  // random: [   // such conditions doesnt work here
  //   {
  //     label: "Ashish",
  //   },
  // ],
};

// NOTE: doent work with array inside objects

// Pick specific nested properties from the source object
const pickedObject = LodashPick(sourceObject, [
  "name",
  "address.details.street",
  "address.details.country",
]);

console.log(pickedObject);
