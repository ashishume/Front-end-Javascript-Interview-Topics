function findNthMaxOccurrence(arr, n) {
  const frequencyMap = {};

  // Count occurrences of each element in the array
  arr.forEach((element) => {
    frequencyMap[element] = (frequencyMap[element] || 0) + 1;
  });

  const resultArray = [];

  for (let i = 0; i < n; i++) {
    let maxOccurrences = -1;
    let nthMaxElement;

    for (const key in frequencyMap) {
      if (
        frequencyMap.hasOwnProperty(key) &&
        frequencyMap[key] > maxOccurrences
      ) {
        maxOccurrences = frequencyMap[key];
        nthMaxElement = key;
      }
    }

    if (nthMaxElement !== undefined) {
      resultArray.push(parseInt(nthMaxElement));
      frequencyMap[nthMaxElement] = -1; // Set occurrences to -1 to avoid recounting
    } else {
      break; // Break if no more unique elements
    }
  }

  return resultArray;
}

// Example usage:
const arr = [1, 4, 5, 1, 1, 4, 1, 4, 3, 3, 3, 3, 3];

console.log(findNthMaxOccurrence(arr, 1)); // Output: 3
console.log(findNthMaxOccurrence(arr, 2)); // Output: 1
console.log(findNthMaxOccurrence(arr, 3)); // Output: 4
console.log(findNthMaxOccurrence(arr, 4)); // Output: 5
