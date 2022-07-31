// (function (i) {
//   delete i; // even after deleting no effect
//   console.log(i); //prints 10
//   return i;
// })(10);

// const obj = {
//   a: "one",  //gets ignored
//   b: "two",
//   a: "three",
// };
// console.log(obj); // prints {a:"three",b:"two"}

// const a = {};
// const b = { key: "b" };
// const c = { key: "c" };
// a[b] = 123; //this gets converted to  {[object Object]: 123}
// a[c] = 456; //this gets converted to  {[object Object]: 456}
/** so since same key property gets reassigned so, it prints 456 */
// console.log(a); //456

// console.log([..."Ashish"]); //  ['A', 's', 'h', 'i', 's', 'h']

// const obj = {
//   username: "Ashish",
//   level: 12,
//   health: 90,
// };
// const data = JSON.stringify(obj, ["level", "health"]); //only given keys will be stringified
// console.log(data);  //{"level":12,"health":90}

/** both will print false as object comparsion happens with object reference,
 * i.e. address of the object not the value */
// console.log({ a: 1 } == { a: 1 }); // false
// console.log({ a: 1 } === { a: 1 }); //false

// let person = { name: "Ashish" };
// const members = [person];
// person.name = null;
// console.log(members); // [  { name:null  }  ]

// const value = { number: 10 };
// const multiply = (x = { ...value }) => {
//   console.log((x.number *= 2));
// };
// multiply(); //20  (takes default value, {...value})
// multiply(); //20  (takes default value, {...value})
// multiply(value); //20  (takes number from value object and modifies the original value object)
// multiply(value); //40  (takes number from value object and modifies the original value object)
