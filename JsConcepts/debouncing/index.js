let counter1 = 0;
let counter2 = 0;
const getData = () => {
  console.log("debounce", counter1++);
  fetch("http://jsonplaceholder.typicode.com/users/" + counter1)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};
const getDataT = () => {
  console.log("throlttle", counter2++);
  fetch("http://jsonplaceholder.typicode.com/users/" + counter2)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

const deboucehandler = (func, delay) => {
  let debounceTimer;
  return function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
  };
};

const fetchDelay = deboucehandler(getData, 300); //when the key press/typing has a delay greater than 300ms then it makes the API call

const throttleHandler = (func, limit) => {
  let flag = true;
  return function () {
    if (flag) {
      func();
      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
};

const throttle = throttleHandler(getDataT, 500); // as soon as the 500ms passes it makes the api call

// Q. Diff bw throttling and debouncing is

//Solution :
// 1. Debouncing makes the a delay in api call whereas throttling ignores all the previous
//key press that occured

//e.g Debouncing:- Samsung...(api call made)  //when user stops typing then only api call is made
//Throttling:- Sams..ung... (api call started from ..ung...) //startes api call when the delay is finised

//Q. sum(1)(2)(3)(4)()
// Solution: let sum =a=>b=> return b? sum(a+b) :a;
