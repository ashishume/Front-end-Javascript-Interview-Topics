console.log(a);
a = "Ashish";

var a;

// In hoisting the Js puts all the variable declarations at the top of
//the file and checks for assgined value before printing
//NOTE: We need to assign value before printing (Even though the declarations is done after printing
//(example above))

//similar example we defined the function later and printed first even then also the funcion gets
//executed successfully

//function getName() {}====> is treated as function property in call stack

// const getName=()=>{}  ====> is treated as variable and declared as undefined when global context is introduced

const func = function () {
  //anonymous functions
  return 10;
};
console.log(func());

b = "Dev";

let b;

/**
 * Hoisting is for var where it assigns undefined to the var
 * let and const works differently
 * let throws error if assigned value before declaration
 * const should be assigned value at the time of declaration
 * 
 * 
 * Note: Variables declared with let and const are hoisted but not initialized 
 * with a default value. Accessing a let or const variable before it's declared
 *  will result in a ReferenceError:
 */
