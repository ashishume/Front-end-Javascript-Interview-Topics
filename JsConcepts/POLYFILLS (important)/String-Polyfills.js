/**
 * repeatify, custom repeat method to convert the string multiple times given by method
 * @param {*} times
 * @returns
 */
String.prototype.repeatify = (times) => {
  return new Array(times + 1).join(this);
};

console.log("Ashish".repeatify(3));
// output: AshishAshishAshish
