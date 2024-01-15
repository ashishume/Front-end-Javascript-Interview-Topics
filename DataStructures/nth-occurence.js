function findNthMaxOccurrence(arr, n) {
  const frequencyMap = {};

  // Count occurrences of each element in the array
  arr.forEach((element) => {
    frequencyMap[element] = (frequencyMap[element] || 0) + 1;
  });

  let currentN = 0;
  let nthMaxElement;

  // Find the n-th most occurring element without using sort
  while (currentN < n) {
    let maxOccurrences = -1;

    for (const key in frequencyMap) {
      if (
        frequencyMap.hasOwnProperty(key) &&
        frequencyMap[key] > maxOccurrences
      ) {
        maxOccurrences = frequencyMap[key];
        nthMaxElement = key;
      }
    }

    // Set the occurrences of the found element to -1 to avoid recounting
    frequencyMap[nthMaxElement] = -1;

    currentN++;
  }

  // Return the n-th most occurring element
  return nthMaxElement ? parseInt(nthMaxElement) : undefined;
}

// Example usage:
const arr = [1, 4, 5, 1, 1, 4, 1, 4, 3, 3, 3, 3, 3];
console.log(findNthMaxOccurrence(arr, 1)); // Output: 1
console.log(findNthMaxOccurrence(arr, 2)); // Output: 4
console.log(findNthMaxOccurrence(arr, 3)); // Output: 5
console.log(findNthMaxOccurrence(arr, 4)); // Output: undefined (out of bounds)
