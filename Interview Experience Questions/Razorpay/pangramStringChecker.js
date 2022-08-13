/** Pangram means the sentence which contains all the letters from A to Z */
// E.G. The quick brown fox jumps over the lazy dog

function pangramChecker(str) {
  let result = new Array(26).fill(false); //fills 26 values as false
  let index;
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= "A" && str[i] <= "Z") {
      index = str.charCodeAt(i) - "A".charCodeAt(0); //charCodeAt() gives the ascii code of the char
    } else if (str[i] >= "a" && str[i] <= "z") {
      index = str.charCodeAt(i) - "a".charCodeAt(0);
    } else continue;

    result[index] = true;
  }
  return result.every((val) => val); //if any of the value gives false then if show false
}

console.log(pangramChecker("The quick brown fox jumps over the lazy dog"));  //true
console.log(pangramChecker("over the lazy dog")); //false
