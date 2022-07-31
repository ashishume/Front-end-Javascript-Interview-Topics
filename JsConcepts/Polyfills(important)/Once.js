/** polyfill for once()  in lodash
 * Even if call a function multiple times it should be called only once
 */
function once(func, context) {
  let ran;
  return function () {
    if (func) {
      ran = func.apply(context || this, arguments);
      func = null;
    }
    return ran;
  };
}
const printHello = once((a, b) => console.log("Hello Ashish", a, b));
printHello(1, 2);
printHello(1, 2);
printHello();
printHello();
printHello();
printHello();
printHello();
printHello();
printHello();
//Output: prints only one time
