/*
Libs included:
    underscore lodash chai sinon sinon-chai mocha async request q bluebird jsdom
*/

// function Graph() {
//   this.vertices = [];
//   this.edges = [];
// }

// Graph.prototype = {
//   addVertex: function (v) {
//     this.vertices.push(v);
//   },
// };

// var g = new Graph();
// console.log(g.addVertex(10));
// console.log(g.addVertex(10));
// console.log(g.addVertex(10));
// console.log(g.addVertex(10));
// console.log(g.addVertex(10));
// console.log(g.edges);
// console.log(g.vertices);
// g is an object with own properties 'vertices' and 'edges'.
// g.[[Prototype]] is the value of Graph.prototype when new Graph() is executed.
// var o = {
//   a: 2,
//   m: function () {
//     return this.a + 1;
//   },
// };

// console.log(o.m()); // 3
// // When calling o.m in this case, 'this' refers to o

// var p = Object.create(o);
// // p is an object that inherits from o

// p.a = 4; // creates a property 'a' on p
// console.log(p.m()); // 5
// // when p.m is called, 'this' refers to p.
// // So when p inherits the function m of o,
// // 'this.a' means p.a, the property 'a' of p

// Prototyping in javascript

// let f = function () {
//   this.a = 1;
//   this.b = 2;
// };
// let o = new f(); // {a: 1, b: 2}

// f.prototype.b = 3;
// f.prototype.c = 4;
// console.log(o.a); // 1

// console.log(o.b); // 2

// console.log(o.c); // 4

// console.log(o.d); // undefined





// document.querySelector("#root").addEventListener("click", (e) => {
//   // console.log(e);

// });

// var array = [1, 2, 3, 4, 5,6,]
// for(var i = 0; i < array.length; i++) {
//   delay(i)
// }
// function delay(i) {
//   setTimeout(() => {
//     console.log(array[i])
//   }, 1000);
// }
// let divide = function (a) {
//   if (!a) {
//     throw new Error("Arguments missing");
//   }

//   let closureFunc = (b) => {
//     if (!b || b == 0) {
//       throw new Error("Minimum 2 arguments required");
//     }
//     return divide(a / b);
//   };
//   closureFunc.toString = () => a;
//   return closureFunc;
// };
// console.log(divide(100, 10)(10)(10));

// function getLength(data) {
//   console.log(data.flat(5).length);
//   return data.flat(5).length;
// }

// function* flatten(array) {
//   for (elt of array)
//     if (Array.isArray(elt)) yield* flatten(elt);
//     else yield elt;
// }

// var testArray = [1, 2, [3, 4, [5, 6], 7], 8, 9, [10, 11], 12];

// console.log(Array.from(flatten(testArray)).length);

// getLength([1, [2, 3]]); //-> 3
// getLength([1, [2, [3, 4]]]); //-> 4
// getLength([1, [2, [3, [4, [5, 6]]]]]); //-> 6
// getLength([1, [2], 1, [2], 1]); //-> 5
// // getLength({ name: "abc", age: 0 }); //-> 2

// class Rectangle {
//   constructor(width, height) {
//     this.width = width;
//     this.height = height;
//   }

//   area = () => {
//     return this.width * this.height;
//   };
// }

// class Square extends Rectangle {
//   constructor(side) {
//     super();
//     this.width = side;
//     this.height = side;
//   }
// }

// const rec = new Rectangle(3, 4);
// const sqr = new Square(3);
// console.log(rec.area()); // 12
// console.log(sqr.area()); // 9

// “Lydia Hallie”

// function Person(firstName, lastName) {
//   this.firstName = firstName;
//   this.lastName = lastName;
// }

// function Child(firstName, lastName, favouriteToy) {
//   this.firstName = firstName;
//   this.lastName = lastName;
//   console.log(this.firstName + " " + this.lastName);
// }

// Child.getFullName = function () {
//   return `${this.firstName} ${this.lastName}`;
// };
// // it has to be new Child and not new Person
// var kid = new Child("Lydia", "Hallie", "Lego");

// console.log(kid.getFullName());

// let arr = [
//   { id: 1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
//   {
//     id: 2,
//     text: "Proin porttitor felis ut lorem tincidunt sagittis eget nec sapien",
//   },
//   {
//     id: 3,
//     text:
//       "Nulla porta tellus sit amet ante consectetur, in malesuada dolor tristique",
//   },
//   {
//     id: 4,
//     text: "Praesent et metus a tellus pretium euismod a vitae sem.",
//   },
// ];
// let item1 = {
//   id: 4,
//   text: "Praesent et metus a tellus pretium euismod a vitae sem.",
// };
// let item2 = {
//   id: 5,
//   text: "Praesent et metus a tellus pretium euismod a vitae sem.",
// };
// result: [
//   { id: 1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit" },
//   {
//     id: 2,
//     text: "Proin porttitor felis ut lorem tincidunt sagittis eget nec sapien",
//   },
//   {
//     id: 3,
//     text:
//       "Nulla porta tellus sit amet ante consectetur, in malesuada dolor tristique",
//   },
//   { id: 4, text: "Praesent et metus a tellus pretium euismod a vitae sem." },
// ];
// let tempArray = [];
// const modifyArrayData = (item) => {
//   tempArray = arr;
//   const dataIndex = arr.findIndex((x) => x.id == item.id);
//   if (dataIndex === -1) {
//     tempArray.push(item);
//   }
//   console.log(tempArray);
// };

// modifyArrayData(item1);
// modifyArrayData(item2);
// // document.querySelector("#category").addEventListener("click", (e) => {
// //   console.log(e);
// // });

// let errorStatment;
// new Promise((resolve, reject) => {
//   resolve("Success!");
// })
//   .then((e) => {
//     throw "Oh No! ";
//   })
//   .catch((error) => {
//     errorStatment = error;
//     throw "actually, that worked";
//   })
//   .catch((error) => console.log(errorStatment + error));


// console.log(null instanceof Object); //false
// console.log(1 instanceof Number); //false
// console.log(1 instanceof Object); // false
// console.log(Number(1) instanceof Object); //false
// console.log(new Number(1) instanceof Object); //true
// console.log(true instanceof Boolean);  //false
// console.log(true instanceof Object); //false
// console.log(Boolean(true) instanceof Object); //false
// console.log(new Boolean(true) instanceof Object); //true
// console.log([] instanceof Array); //true
// console.log([] instanceof Object); //true
// console.log((() => {}) instanceof Object); //true

// const arr = ["Australia", "India", "USA", "Pakistan", "canada", "England", "bangladesh"];
// const numbers = [1, 7, 3, 6, 99, 345, 534, 21];

// const x = arr.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
// const y = numbers.sort((a, b) => a - b);

// console.log(c);
// const a = document.getElementById("inner");
// const b = document.getElementsByClassName("container");
// const c = document.getElementsByName("nameData");
// const d = document.getElementsByTagName("span");
// const e = document.getElementsByTagNameNS(
//   "https://sapui5.hana.ondemand.com/1.36.6/docs/guide/f7cbafc9a76140ec8fc55b51a63cf467.html",
//   "div"
// );
// const f = document.getRootNode();
// const g = document.querySelector(".container");
// const h = document.querySelectorAll(".container");
// const i = document.getSelection();

// console.log("id", a);
// console.log("class name", b);
// console.log("elements by name", c);
// console.log("tag name", d);
// console.log("tag name ns", e);
// console.log("root", f);
// console.log("query selector", g);
// console.log("query selector all", h);
// console.log("selection", i);
