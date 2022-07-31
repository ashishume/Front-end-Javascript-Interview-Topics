/**
 * TYPE COERCION or  Implicit Conversion
 * Type coercion is the convertion done by JS Engine is called type coercion.
 * Examples below:
 */
//console.log(1 + "2");  //"12"
// console.log("2" + undefined);  //"2undefined"
// console.log("2" + NaN);  //"2NaN"
// console.log(null.toString()); //Cannot read properties of null
// console.log(undefined.toString()); //Cannot read properties of null
// console.log("Hello" - "hello");  //NaN
// console.log("2" * 2); //4

/*
* TYPE CONVERSION or explicit Conversion
Convertion done by typing by user is called type conversion
Examples below:
 String()  Number()  .toString()  .toFixed()  Boolean()
*/
// console.log(String(1 + 2)); // "3"
// console.log(String(undefined)); // "undefined"
// console.log(String(null)); // "null"
