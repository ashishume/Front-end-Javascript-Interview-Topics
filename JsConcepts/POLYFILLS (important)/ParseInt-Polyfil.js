/** this is a basic implementation of parseInt()
 * it handles the cases like
 * "-40" ==> 40
 * "40" ==> 40
 * "40abc" ==> 40
 * "--400" ==> NaN
 * "abc" ==> NaN
 */

function myParseInt(string) {
  if (typeof string !== "string") {
    throw new TypeError("First argument must be a string");
  }

  // Remove whitespace
  string = string.trim();

  const digitMap = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
  };

  let result = 0;
  let i = 0;
  let isChar = false; // check if all of them are chars

  // negative and positive case
  if (string[0] === "-" || string[0] === "+") {
    i++;
  }

  while (i < string.length) {
    const char = string[i];
    const digit = digitMap[char];

    if (digit === undefined) {
      isChar = true; // if any one of them is char then mark it true
      break;
    }

    result = result * 10 + digit; // convert to number
    i++;
  }

  if (isChar === true && result === 0) {
    // check if char is true and 0 means if none of them were numbers
    return NaN;
  }
  return result;
}

console.log(myParseInt("-40")); // 40
console.log(myParseInt("40")); // 40
console.log(myParseInt("0")); // 0
console.log(myParseInt("40abc")); // 40
console.log(myParseInt("--400")); // NaN
console.log(myParseInt("abc")); // NaN
console.log(myParseInt("00000005000")); // 5000
