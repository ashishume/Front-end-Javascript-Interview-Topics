/** callback hell */

function sum(s, callback) {
  callback(s + 1);
}
function multiply(s, callback) {
  callback(s * 10);
}
function subtract(s, callback) {
  callback(s - 10);
}
function divide(s) {
  console.log(s / 2);
  return s / 2;
}

/** the following is a callback hell where one function is passed into another function
 * and then called (not a good practice)
 */
const a = sum(10, (action) => {
  console.log(action);
  multiply(action, (action2) => {
    console.log(action2);
    subtract(action2, (action3) => {
      console.log(action3);
      divide(action3);
    });
  });
});
