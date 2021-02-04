function Func() {
  foo = 10;
  return foo; //prints 10 only

  var foo = "11"; //value is not accessible but var declaration is being used here
}

const s = Func();
console.log(s);

function loopFunc() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i); //prints=====>  0 1 2 3 4 5
    });
  }
}
function delayLoopFunc() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i); // still prints=====>  0 1 2 3 4 5 (but after the delay)
    }, 1000);
  }
}
function delayLoopFuncVar() {
  for (var i = 0; i < 5; i++) {
    //let is changed to var
    setTimeout(() => {
      console.log(i); //  prints=====> 5 (5 times) as var is being used as global scope
    });
  }
}

// function setTimeFunc() {
//   var i = 9;
//   setTimeout(() => {
//     console.log("==>", i);
//   }, 1000);
// }

// setTimeFunc();

// loopFunc();
// delayLoopFunc();
// delayLoopFuncVar()

const arr = [1, 5, 6, 7, 8];
delete arr[1]; //here "delete" removes the value and key but while printing key doesnt show up.
//result==>  arr[0]  "empty"  arr[2] arr[3] arr[4]
// console.log(arr);

function NormalFunc(a, b) {
  console.log(arguments[0]); //works here
}
const ArrowFunc = (a, b) => {
  //duplicate named not allowed in arrow function
  console.log(this.arguments[0]); //error
};

// const ar1 = [1, 2];
// const ar2 = ["a", "b"];

// console.log([...ar1, ...ar2]);

NormalFunc(81, 82);
ArrowFunc(85, 86);
