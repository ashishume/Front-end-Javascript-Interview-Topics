/**
 * 
Q1. write a function which can handle both 
sum(2)(3) => 5
sum(2,3) => 5
function sum(...args) {
    let sum = 0;
    function abc(...inner) {
        if (inner.length === 0) return sum;
        sum += inner.reduce((acc, num) => acc + num, 0);
        return abc;
    }
    return abc(...args);
}
*/

// _________________________________________________________________________________

/**
 * 
Q2. write a program 
const array = [1, 2, 3, 4, 5, 6, 7, 8];
const chunkSize = 4;
function chunkSizeArray(arr, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
}
console.log(chunkSizeArray(array, chunkSize));
output :[
    [1, 2, 3],
    [4, 5, 6],
    [7, 8],
];
*/
// _________________________________________________________________________________

//Q3. Output based
// function a() {
//   b();
//   console.log("in a");
// }

// function b() {
//   c();
//   console.log("in b");
// }

// async function c() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/todos");
//   console.log("in c");
//   // return b();
// }

// a();
// console.log("outside");

// OUTPUT:
// in b
// in a
// outside
// in c

// FOllow up to the above convert the output to be this
// in c
// in b
// in a
// outside

// async function a() {
//     await b()
//     console.log("in a");
// }

// async function b() {
//     await c()
//     console.log("in b");
// }

// async function c() {
//     await fetch("https://jsonplaceholder.typicode.com/todos")
//     console.log("in c");
// }

// a().then(() => console.log("outside"));
// output
// in c
// in b
// in a
// outside

// Q4. Pass by value and pass by reference difference

// const name = "A";
// const fullname = name + 'B';

// const names = ['A'];
// const allNames = names;

// allNames.push('B');

// console.log(name, fullname); //A , AB
// console.log(names, allNames);  // ['A','B']   , ['A','B']
// _________________________________________________________________________________

// print 8
// const p1 = {
//   marks: 4,
//   getValue: function () {
//     console.log(this.marks);
//   },
// };
// const p2 = {
//   marks: 8,
// };
// const obj = p1.getValue.bind(p2);
// obj();

// _________________________________________________________________________________

// function sum() {
//   console.log(this);
// }
// // sum()
// function sum() {
//   console.log(this);
// }

// const numbers = {
//   sum,
// };

// const nsum = numbers.sum;

// nsum();   // prints window object
// numbers.sum();   //prints numbers object itself
// sum();   // prints window object

