// function sq(a) {
//   return a * a;
// }

// console.log(typeof sq.toString());

// var a = 7;
// var b = 10;

// function demo1() {
//   return demo2(a, b) + ex();
// }

// function demo2(x, y) {
//   return x + y;
// }

// function ex() {
//   let a = 1;
//   let b = 2;
//   return a + b;
// }

// console.log(demo1())

// let res=""

// let u

// var date = new Date("April 31, 2020 06:30:30");
// var fetch = date.toJSON();

// console.log(fetch);

// let n = 1;

// function myFun() {
//   for (var i = 0; i < 4; i++) {
//     n += 2;
//     return youFunc(n);
//   }
// }

// function youFunc(x) {
//   x -= 1;
//   if (x == 2) return x++;
// }

// console.log(myFun());

// var x = 4;

// const obj = {
//   x: 3,
//   bar: function () {
//     var x = 2;
//     setTimeout(function () {
//       var x = 1;
//       console.log(this.x);
//     }, 500);
//   },
// };

// console.log(obj.bar());

// const a=["1", "2", "3"].map(parseInt);

// console.log(a);

// function bar() {
//   return foo;

//   function foo() {}
//   foo = 10;

//   var foo = 11;
// }

// console.log(bar());

// var res = (function (x) {
//   delete x;
//   return x;
// })(0);

// console.log(res);

// function fun1() {
//   var test = [];
//   for (var z = 0; z < 5; z++) {
//     //   console.log(z);
//     test[z] = function () {
//       return z;
//     };
//   }
//   return test;
// }

// var test = fun1();

// console.log(test[3]());

// const obj = {
//   name: "Ashish",
//   foo: function () {
//     console.log(this.name);
//   },
// };

// var name = "Dev";

// obj.foo(); //prints Ashish

// setTimeout(obj.foo, 100); //print Dev
