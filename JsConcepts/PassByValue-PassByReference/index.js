/*

Pass by Value:
In pass by value, a copy of the variable's value is passed to the function. This means that changes made to the parameter within the function do not affect the original variable outside of the function.

*/

function modifyValue(value) {
  value = 10;
  console.log("Inside function:", value); // Output: 10
}

let num = 5;
modifyValue(num);
console.log("Outside function:", num); // Output: 5

//here num is passed to the function then value is being changed inside function but the original value remains intact

/**
 Pass by Reference:
In pass by reference, a reference to the variable is passed to the function. This means that changes made to the parameter within the function affect the original variable outside of the function.
 */

function modifyArray(arr) {
  arr.push(4);
  console.log("Inside function:", arr); // Output: [1, 2, 3, 4]
}

let myArray = [1, 2, 3];
modifyArray(myArray);
console.log("Outside function:", myArray); // Output: [1, 2, 3, 4]

/********************************************************************** */
function modifyObj(obj) {
  obj.age = 10;
  console.log("Inside function obj:", obj);
  //output:   {
  //     "name": "Ashish",
  //     "age": 10
  // }
}

let myObj = { name: "Ashish" };
modifyObj(myObj);
console.log("Outside function obj:", myObj);
//output:   {
//     "name": "Ashish",
//     "age": 10
// }

//here copy of array/object is being modified, and hence original also gets modified so its passed by reference.
