/**
 * 
 * 1) forEach method
The forEach() method executes a provided function once for each element in an array. After executing the function for every array element, this method changes the values of the existing array elements according to the result of the provided function. Hence forEach() is a mutator method. Also, forEach method doesn’t return anything (undefined).
 */

/**
 * 2) map method
The map() method, similar to the forEach() method, executes the provided function once for each element in an array. But unlike the forEach() method, it creates a new array with the results of calling a function for every array element. Hence map() method relies on immutability. Also, map() does not execute/call the function for those array elements without values.
 */

//Foreach() doesnt return anything so it cannot be chained with .sort() or anything
//map() does return a new array it can be chained with .sort((a,b)=>a-b)

const reqObject = new Promise((res, rej) => {
  fetch(`https://jsonplaceholder.typicode.com/todos/1`)
    .then((response) => response.json())
    .then((json) => res(json))
    .catch((err) => rej(new Error("Error occured")));
}).catch(err=>console.log(err));

reqObject
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
