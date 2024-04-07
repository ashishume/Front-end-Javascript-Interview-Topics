import { useEffect, useState } from "react";

const UseOnScreen = (ref: any) => {
  const [isIntersecting, setIntersecting] = useState(false);
  // monitor the interaction
  const observer = new IntersectionObserver(
    ([entry]) => {
      // update the state on interaction change
      setIntersecting(entry.isIntersecting);
    },
    {
      threshold: 1.0,
    }
  );
  useEffect(() => {
    // assign the observer
    observer.observe(ref.current);

    // remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
};

export default UseOnScreen;

// using getBoundingclient
// function useOnScreen2(ref: any) {
//   const [isIntersecting, setIntersecting] = useState(false);

//   // determine if the element is visible
//   const observer = function () {
//     const offset = 50;
//     const top = ref.current.getBoundingClientRect().top;
//     setIntersecting(top + offset >= 0 && top - offset <= window.innerHeight);
//   };

//   useEffect(() => {
//     // first check
//     observer();

//     // assign the listener
//     window.addEventListener("scroll", observer);

//     // remove the listener
//     return () => {
//       window.removeEventListener("scroll", observer);
//     };
//   }, []);

//   return isIntersecting;
// }
