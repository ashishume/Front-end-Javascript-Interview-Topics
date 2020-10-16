function Graph() {
  this.vertices = [];
  this.edges = [];
}

Graph.prototype = {
  addVertex: function (v) {
    this.vertices.push(v);
  },
};

var g = new Graph();
console.log(g.addVertex(10));
console.log(g.addVertex(10));
console.log(g.addVertex(10));
console.log(g.addVertex(10));
console.log(g.edges);
console.log(g.vertices);
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
