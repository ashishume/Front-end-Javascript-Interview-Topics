/**
 * When one function is dependent upon previous function result then we return the 2nd function 
 * with the value from 1st function. and this is done using .then()
 * Promise chaining helps in avoiding the "callback hell" problem and makes the code more readable and maintainable. 
 */

function asyncOperation1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("First result");
    }, 1000);
  });
}

function asyncOperation2(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data + " Second result");
    }, 1000);
  });
}

asyncOperation1()
  .then((result) => {
    console.log(result);
    return asyncOperation2(result);
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });

