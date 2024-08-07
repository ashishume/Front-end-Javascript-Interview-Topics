/** follow video link: https://youtu.be/Qkcwveti-lE?list=PL0b6OzIxLPbzvz4j1N4J8zCY8mu3l29MG */

/** generator functions
 * 
 * Application: Used in redux-saga to handle async operations like apis etc
 */
function* generator(i) {
  yield i;
  console.log("hello");
  yield i + 10;
}

const gen = generator(10);

//When the done becomes true, the generator stops and won’t generate any more values.

// console.log(gen.next().value); /* Calling next() indicates whether the generator has yielded its last value, as a boolean  */
// expected output: 10

// console.log(gen.next().value); //if we do not execute this line function prints upto line 2, below that it doesnt print
// expected output: 20

/**
 * Generator functions solves the problem of Inversion of control and callback hell (http://callbackhell.com/)
 */

function* test() {
  yield "First";
  yield "Second";
  yield "Third";
}

const obj = test();
console.log(obj.next());
console.log(obj.next());
console.log(obj.next());
console.log(obj.next());
