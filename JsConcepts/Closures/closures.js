function x() {
  var a = 9;
  function y() {
    console.log(a);
  }
  a = 100; //prints a because console.log points to a memory location not the "a" value
  y();
}
x();

// the function along with its lexical scope bundled together forms a closure (above is an example)
