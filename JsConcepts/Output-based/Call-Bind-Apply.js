const arr = ["a", "b", "c"];
const numbers = [1, 2, 3, 5];

/** Q. combine 2 arrays without using concat or spread, just use apply */
// arr.push.apply(arr, numbers); //apply takes array as input so each item gets executed individually
// console.log(arr);

/** Q. Find max from array using apply */
// console.log(Math.max.apply(null, numbers));
//provide context as null and providing params as array input it operates on
//each param one by one

/** Q. Bound function */
// function f() {
//   console.log(this); //prints window object as the context is hard fixed,
// }
// let user = {
//   g: f.bind(null), //even if its called here, it doesnt print null
// };
// user.g();

/** Q. Bind chaining (doesnt exist), its to trick interviee */
// function f() {
//   console.log(this.name);
// }
// f = f.bind({ name: "John" }).bind({ name: "Ashish" }); //2nd bind does'nt work as there is no such concept
// f();

/** Q. Fix the code */
// function login(success, failed) {
//   const pass = prompt("Enter pass", "");
//   if (pass === "admin") return success();
//   failed();
// }
// const res = {
//   name: "Ashish Debnath",
//   loginSuccess() {
//     console.log(`${this.name} logged in`);
//   },
//   loginFailed() {
//     console.log(`${this.name} failed to login`);
//   },
// };
// // login(res.loginSuccess, res.loginFailed);  // need to fix this
// login(res.loginSuccess.bind(res), res.loginFailed.bind(res)); // after fixing

/** Q. Fix the code */
// function login(success, failed) {
//   const pass = prompt("Enter pass", "");
//   if (pass === "admin") return success();
//   failed();
// }
// const res = {
//   name: "Ashish Debnath",
//   result(isLoggedIn) {
//     console.log(this.name + (isLoggedIn ? " logged in" : " failed to login"));
//   },
// };
// // login(?, ?);  // need to fix this
// login(res.result.bind(res, true), res.result.bind(res, false)); // after fixing


/** Q. Bind with arrow function (it doesnt work with bind,call or apply)  */
// var age = 10;
// const person = {
//   age: 20,
//   arrowFunc: () => {
//     console.log(this.age); //prints 10 as arrow function takes this context 
//                            //from its parent object, here parent is person object 
//   },
// };

// const person2 = { age: 24 };
// person.arrowFunc.call(person2);


