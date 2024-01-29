/**
 1. why iframe should not be used for all websites, and why statistics are embeded inside iframe
 2. 1k users to 1million users changes in website
 3. how website loading works when user requests a url, (whole procedure)
 4. can we use div inside a span?
 5. state management for react and angular
 6. how does responsiveness for desktop screens, what things that needs to be takes care
 7. when a product is ready for deployment.
 * 
 */

function callMethod() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(2);
    }, 5000);
  });
}
(function () {
  console.log(1);
  callMethod().then((d) => console.log(d));
  setTimeout(() => console.log(4), 2000);
  setTimeout(() => console.log(5), 0);
  console.log(6);
})();


// const arr = [123,456,753,456,123,456]
// output
// fn(1) = 456
// fn(2) = 123,456
// don't use sort() method


// const arr = [123, 456, 753, 456, 123, 456];
// // output
// // fn(1) = 456
// // fn(2) = 123,456
// // don't use sort() method
// n = 1;
// function maxOccurrence(n, arr) {
//   const len = arr.length;

//   const map = {};
//   for (let i = 0; i < len; i++) {
//     if (!map[arr[i]]) {
//       map[arr[i]] = 1;
//     } else {
//       map[arr[i]] += 1;
//     }
//   }

//   let maxCount = 0;
//   let maxCountEl = null;
//   for (let key in map) {
//     if (map[key] > maxCount) {
//       maxCountEl = key;
//       maxCount = map[key];
//     }
//   }

//   return maxCountEl;
// }

// console.log(maxOccurrence(1, arr));

// https://codesandbox.io/p/sandbox/nice-shape-ffr3c5
// import { useEffect, useRef, useState } from "react";
// import "./styles.css";

// export default function App() {
//   const [timer, setTimer] = useState(0);
//   const [isPaused, setPaused] = useState(false);
//   const ref = useRef();
//   useEffect(() => {
//     startTimer();
//   }, []);
//   const startTimer = () => {
//     if (!ref.current) {
//       setPaused(false);
//       ref.current = setInterval(() => setTimer((prev) => prev + 1), 1000);
//     }
//   };
//   const stopTimer = () => {
//     if (ref.current || isPaused) {
//       clearInterval(ref.current);
//       ref.current = null;
//       setTimer(0);
//     }
//   };
//   const pauseTimer = () => {
//     if (ref.current) {
//       setPaused(true);
//       clearInterval(ref.current);
//       ref.current = null;
//     }
//   };

//   return (
//     <div>
//       <h2>{timer}</h2>
//       <br />
//       <button onClick={startTimer}>Start</button>
//       <button onClick={pauseTimer}>pause</button>
//       <button onClick={stopTimer}>Stop</button>
//     </div>
//   );
// }



// https://live-par-2-cdn-alt.livepush.io/live/bigbuckbunnyclip/index.m3u8

// <div class="container">
// <div class="row"></div>
// <div class="row"></div>
// <div class="row"></div>
// <div class="row"></div>
// </div>


// .container{
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: flex-start;
//   }
//   .row{
//     height: 200px;
//     width: 200px;
//     background: red;
//     margin: 5px;
//   }
