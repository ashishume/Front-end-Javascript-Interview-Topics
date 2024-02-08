// a(1)(2)(3)(4)(5)...() ==> 15

// function sum(a) {
//   return function (b) {
//     if (b) return sum(a + b);
//     return a;
//   };
// }

// const res = sum(1);

// console.log(res());

// for (var i = 0; i < 5; i++) {
//   function abc(e) {
//     setTimeout(() => console.log(e), 2000);
//   }
//   abc(i);
// }

// const App=()=>{
//create a didupdate method from class react
// const [counter,setCounter]=useState(0)
//     useEffect(()=>{
//         //updated
//         console.log(counter);
//     },[counter])

//     return <>

//     </>
// }

Array.prototype.customMap = function (callback, arg) {
  //polyfill for map
  // base conditions

  if (this == null) {
    throw new Error("some error");
  }
  if (typeof callback !== "function") {
    throw new Error("some error");
  }

  let mapArray = [];

  for (let i = 0; i < this.length; i++) {
    mapArray.push(callback.call(arg, this[i], i));
  }
  return mapArray;
};

// --------------------
// var a = 20;
// {
//   var a = 2;
// }
// console.log(a); //2
// --------------------------------------------
// var a = 20;
// function demo() {
//   var a = 2;
// }
// demo();
// console.log(a); // 20
// --------------------------------------------
// a = 20;
// function demo() {
//   a = 2;
// }
// demo();
// console.log(a);   //2

// --------------------------------------------
// a(1)(2)(3)(4)(5)...() ==> 15 // curring
// _______________
// for (var i = 0; i < 5; i++) {
//   function fetch(i) {
//     setTimeout(() => console.log(i), 2000);
//   }
//   fetch(i);
// }
