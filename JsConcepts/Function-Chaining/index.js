const operations = function () {
  this.result = 0;
  this.add = function (a) {
    this.result = this.result + a;
    return this; //return the context to allow further chaining
  };
  this.mul = function (a) {
    if (this.result === 0) this.result = 1;
    this.result = this.result * a;
    return this;
  };
  this.sub = function (a) {
    this.result = this.result - a;
    return this;
  };
  this.div = function (a) {
    this.result = this.result / a;
    return this;
  };
};
const obj = new operations();
const b = obj.add(10).mul(2).div(2).add(2);
// console.log(b.result);
// -------------------------------------------------------------------------

function add(a) {
  return 10 + a;
}
function mul(a) {
  return 10 * a;
}
function div(a) {
  return a / 10;
}
function funcList(functions) {
  return (args) => {
    return functions.reduce((currentValue, currentFunction) => currentFunction(currentValue), args);
  };
}
const a = funcList([add, mul, div])(2);
// console.log(a);
