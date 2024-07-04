function splitPolyfill(str, delimiter) {
  let result = [];
  let currSubstr = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === delimiter) {
      result.push(currSubstr);
      currSubstr = "";
    } else {
      currSubstr += str[i];
    }
  }
  result.push(currSubstr);

  return result;
}

console.log(
  splitPolyfill(
    "This is a, sample sentence, separated by spaces. My name, is Ashish",
    ","
  )
);

// output
// [
//     "This is a",
//     " sample sentence",
//     " separated by spaces. My name",
//     " is Ashish"
// ]