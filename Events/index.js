let counter = 0;
const getData = () => {
  console.log("fetch", counter++);
};

const deboucehandler = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const fetchDelay = deboucehandler(getData, 300);

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

const throttle = throttleHandler(getData,500);

// Q. Diff bw throttling and debouncing is

//Solution :
// 1. Debouncing makes the a delay in api call whereas throttling ignores all the previous
//key press that occured

//e.g Debouncing:- Samsung...(api call made)
//Throttling:- Sams..ung... (api call started from ..ung...)

//Q. sum(1)(2)(3)(4)()
// Solution: let sum =a=>b=> return b? sum(a+b) :a;
