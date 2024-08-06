// Example 1:

// Input: s = "ab#c", t = "ad#c"
// Output: true
// Explanation: Both s and t become "ac".
// Example 2:

// Input: s = "ab##", t = "c#d#"
// Output: true
// Explanation: Both s and t become "".
// Example 3:

// Input: s = "a#c", t = "b"
// Output: false
// Explanation: s becomes "c" while t becomes "b".

function util(str) {
  const stack = [];
  for (let char of str) {
    if (char === "#") {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      stack.push(char);
    }
  }
  return stack.join("");
}

function strComparison(str1, str2) {
  const p1 = util(str1);
  const p2 = util(str2);

  return p1 === p2;
}

console.log(strComparison("a#c", "b"));


// Q2. retry 3 times for api call if failed then return error (solution available in js Concepts)