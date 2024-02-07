const getName = () => "hsihsa";

const capitilizeName = (arg) => arg.toUpperCase();

const reverseString = (arg) => arg.split("").reverse().join("");

/** here we had to write nested functions one inside another, which is long process */
// console.log(reverseString(capitilizeName(getName())));

/** So to solve above problem we create a pipe method to fix it */

const pipe = (...functions) => {
  return (args) => {
    return functions.reduce((currentValue, currentFunction) => currentFunction(currentValue), args);
  };
};


/** compose is same as pipe() just that its opposite in direction,
 * i.e. functions executes from right to left, to do so
 * use: functions.reduceRight()
 *
 */

const compose =
  (...functions) =>
  (args) =>
    functions.reduceRight((currVal, currFunc) => currFunc(currVal), args);


console.log(pipe(getName, capitilizeName, reverseString)());
