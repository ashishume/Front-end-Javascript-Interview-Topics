function createSetIntervalPolyill() {
  let intervalID = 0;
  let intervalMap = {};
  function setIntervalPolyfill(callback, delay = 0, ...args) {
    let id = intervalID++;
    function repeat() {
      intervalMap[id] = setTimeout(() => {
        callback(...args);

        if (intervalMap[id]) repeat();
      }, delay);
    }
    repeat();

    return id;
  }

  function clearTimeIntervalPolyfill(intervalID) {
    clearTimeout(intervalMap[intervalID]);
    delete intervalMap[intervalID];
  }

  return {
    setIntervalPolyfill,
    clearTimeIntervalPolyfill,
  };
}

const { setIntervalPolyfill, clearTimeIntervalPolyfill } = createSetIntervalPolyill();

let count = 0;
function greeting() {
  count++;
    console.log("hello world");
  if (count >= 3) clearTimeIntervalPolyfill(intervalid);
}

const intervalid = setIntervalPolyfill(greeting, 500);
