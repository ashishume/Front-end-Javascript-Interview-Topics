// const arr = [1, 2, 3, 4, 5, 6, 7, 8];
// const limit = 2;
// const delay = 5000;

/** Design a throttler
 * Q link: https://leetcode.com/discuss/interview-question/346402/Uber-or-Phone-Screen-or-Design-a-Throttler
 *
 */

/** one way using Date.now() */
// const throttler = (arr, limit, callback, delay) => {
//   let lastRan;
//   let timerId;
//   let queue = [...arr];
//   return function () {
//     if (!lastRan) {
//       const tasks = queue.splice(0, limit);
//       callback(tasks);
//       lastRan = Date.now();
//     } else {
//       clearTimeout(timerId);
//       timerId = setTimeout(() => {
//         if (Date.now() - lastRan >= delay) {
//           const tasks = queue.splice(0, limit);
//           callback(tasks);
//           lastRan = Date.now();
//         }
//       }, delay - (Date.now() - lastRan));
//     }
//   };
// };

const throttler = (arr, limit, callback, delay) => {
  let flag = true;
  let queue = [...arr];
  return function () {
    if (flag) {
      const tasks = queue.splice(0, limit); //this method can be replaced with any callback method as per the use case
      callback(tasks);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
};

const newBtn = document.getElementById("btn");

newBtn.addEventListener(
  "click",
  throttler(
    [1, 2, 3, 4, 5, 6, 7, 8],
    2,
    (tasks) => {
      console.log(tasks);
    },
    2000
  )
);
