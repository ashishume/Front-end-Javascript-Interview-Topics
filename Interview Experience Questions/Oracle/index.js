/**
 * give me a code to using dialpad where phone number is valid or not where movement is similar to knight in js
 * 
 *  const dialpad = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [null, 0, null]
    ];
 */

function isValid(phoneNumber) {
  // Map of knight's possible moves from each number
  const knightMoves = {
    0: [4, 6],
    1: [6, 8],
    2: [7, 9],
    3: [4, 8],
    4: [0, 3, 9],
    5: [],
    6: [0, 1, 7],
    7: [2, 6],
    8: [1, 3],
    9: [2, 4],
  };

  // Convert the phone number to an array of digits
  let digits = Array.from(phoneNumber, Number);
  // Check each pair of digits
  for (let i = 0; i < digits.length - 1; i++) {
    let start = digits[i];
    let end = digits[i + 1];
    if (!knightMoves[start].includes(end)) {
      return false;
    }
  }

  return true;
}

console.log(isValid("0481592637")); // Example usage
