function* generator(i) {
  yield i;
  console.log("hello");
  yield i + 10;
}

const gen = generator(10);

//When the done becomes true, the generator stops and won’t generate any more values.

console.log(gen.next().value); /* Calling next() indicates whether the generator has yielded its last value, as a boolean  */
// expected output: 10

console.log(gen.next().value); //if we do not execute this line function prints upto line 2, below that it doesnt print
// expected output: 20


/**
 * Generator functions solves the problem of Inversion of control and callback hell (http://callbackhell.com/)
 */
