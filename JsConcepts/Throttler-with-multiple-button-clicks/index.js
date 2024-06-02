/** button click function throttler */

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Example usage:
const handleClick = () => {
  console.log("Button clicked!");
};

const throttledHandleClick = throttle(handleClick, 2000);

document
  .getElementById("myButton")
  .addEventListener("click", throttledHandleClick);
