/** cheating in lexical scope */
function foo(str, a) {
  eval(str);
  console.log(a, b);
}

/** outer b is ignored as eval() method converts string to
 * var b and uses the inside b as variable
 * */
var b = 1;

foo("var b=2", 3);
//OUTPUT: 3,2   (instead of 3,1)
/** use strict mode to avoid such behaviour */
