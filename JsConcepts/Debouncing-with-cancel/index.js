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
