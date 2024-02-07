function longestPrefix(arr) {
  if (arr.length === 0) return "";

  let prefix = arr[0];

  for (let i = 1; i < arr.length; i++) {
    let j = 0;
    while (j < prefix.length && j < arr[i].length && prefix[j] === arr[i][j]) {
      j++;
    }
    prefix = prefix.substring(0, j);
    if (prefix === "") break;
  }
  return prefix;
}

/** To find the longest common prefix in a string array in JavaScript, you can use the following function */
// const arr = ["flower", "flow ", "flock "];
const arr = ["ashish", "apple", "interview"];
console.log(longestPrefix(arr));


/**
2. promise.all() polyfill
3. debounce handler method 

 */

// <style>
// #outer {
//   height: 200px;
//   width: 500px;
//   border: solid 1px black;
// }
// #inner {
//   height: 200px;
//   width: 300px;
//   border: solid 1px black;
// }
// #btn {
//   height: 200px;
//   border: solid 1px black;
//   width: 200px;
// }
// </style>
// <div id="outer">
// <div id="inner">
//   <button id="btn">Click me</button>
// </div>
// </div>
// <script>
// document.getElementById("outer").addEventListener(
//   "click",
//   function () {
//     console.log("Outer Div Clicked");
//   },
//   true
// );

// document.getElementById("inner").addEventListener(
//   "click",
//   function () {
//     console.log("Inner Div Clicked");
//   },
//   false
// );

// document.getElementById("btn").addEventListener("click", function () {
//   console.log("Button Clicked");
// });
// </script>