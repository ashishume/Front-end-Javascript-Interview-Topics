/**var is globally scoped(means available for whole window when declared outside)
 * functional scope/local scope when defined inside a function
 */

/** let and const are local scope which means only available for that scope,
 * also const cannot be reassigned
 */




/**
 * Hoisting of var is possible, means
 */
// console.log(a); //prints undefined (which means var is hoisted)
// var a = 6;

// console.log(b, c);  // throws error of ReferenceError: Cannot access 'a'/'c' before initialization
// const b = 6;
// let c = 9;



/** var can be reassigned or redefined, which is fine, but when same variable is reassgined with new value
 * it becomes problem when we unknowingly changed the value of the original value.(which creates bugs)
 * 
 * For let const same name cannot be redeclared
 */
// var a = 10;
// var a = 11;

// console.log(a);
