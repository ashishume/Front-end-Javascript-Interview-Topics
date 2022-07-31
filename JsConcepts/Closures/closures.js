function x() {
  var a = 9;
  function y() {
    console.log(a);
  }
  a = 100; //prints a because console.log points to a memory location not the "a" value
  y();
}
x(); //100

// the function along with its lexical scope bundled together forms a closure (above is an example)

/**
 * Diff between closures and scope
 * Function within another function is called closure. (3 types local scope outer scope and global scope)
 * Scope defines what variable we have access. (2 types local scope and global scope)
 */

var a = 1;
function func() {
  return function (b) {
    return function (c) {
      return function (d) {
        /** have access to all the scopes due to closures upto global scope */
        return a + b + c + d;
      };
    };
  };
}

const z = func()(3)(3)(3);
console.log(z); // 10
