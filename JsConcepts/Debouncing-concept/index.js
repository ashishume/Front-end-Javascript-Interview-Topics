// Q. Diff bw throttling and debouncing is

//Solution :
// 1. Debouncing makes the a delay in api call whereas throttling ignores all the previous
//key press that occured

//e.g Debouncing:- Samsung...(api call made)  //when user stops typing then only api call is made
//Throttling:- Sams..ung... (api call started from ..ung...) //startes api call when the delay is finised

/**
 * New debouncing method (better readability) (updated 2022)
 */

const myDebounce = (functions, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      functions.apply(this, args);
      // functions.call(this, ...args); we can use both call or apply
    }, delay);
  };
};

const clickNewDebounce = myDebounce(() => {
  console.log("clicked");
}, 500);

/** Throttle */
const myThrottle = (callback, delay) => {
  let isThrottled = false;
  return (...args) => {
    if (!isThrottled) {
      // Execute the callback immediately if not throttled
      callback.apply(this, args);
      // functions.call(this, ...args); we can use both call or apply

      isThrottled = true;
      // Set a timeout to reset the throttle flag after the delay
      setTimeout(() => {
        isThrottled = false;
      }, delay);
    }
  };
};

// Example usage:
const throttledScrollHandler = myThrottle(() => {
  console.log("Scrolled!");
}, 1000); // Throttle to once per second

window.addEventListener("scroll", throttledScrollHandler);

// -----------------------------------
// debounce with cancel delayed invocations
function debounceWithCancel(func, delay) {
  let timeoutId;

  function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }

  debounced.cancel = function () {
    clearTimeout(timeoutId);
  };

  return debounced;
}

// ----------------------------------------------------

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
// ------------------------------------------------------------------------------------
/** throttle method without settimeout */
const throttleWithoutSetTimeout = (func, delay) => {
  let lastCalledTimeStamp = 0;

  return (...args) => {
    const now = Date.now();
    if (now - lastCalledTimeStamp >= delay) {
      func(...args);
      lastCalledTimeStamp = now;
    }
  };
};

/** debounce method without settimeout */
const debounceWithoutSetTimeout = (func, delay) => {
  let lastCalledTimeStamp = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCalledTimeStamp < delay) {
      return;
    }
    func(...args);
    lastCalledTimeStamp = now;
  };
};

const throttle = throttleHandler(getDataT, 500); // as soon as the 500ms passes it makes the api call
