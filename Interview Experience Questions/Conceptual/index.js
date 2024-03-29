function Func() {
  foo = 10;
  return foo; //prints 10 only
  var foo = "11"; //value is not accessible but var declaration is being used here
}

const s = Func();
// console.log(s);

function loopFunc() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log("first=", i); //prints=====>  0 1 2 3 4 5
    });
  }
}
function delayLoopFunc() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log("second=", i); // still prints=====>  0 1 2 3 4 5 (but after the delay)
    }, 1000);
  }
}
function delayLoopFuncVar() {
  for (var i = 0; i < 5; i++) {
    //let is changed to var
    setTimeout(() => {
      console.log("third=", i); //  prints=====> 5 (5 times) as var is being used as global scope
    });
  }
}
function setTimeFunc() {
  var i = 9;
  setTimeout(() => {
    console.log("==>", i);
  }, 1000);
}
// setTimeFunc();
// loopFunc();
// delayLoopFunc();
// delayLoopFuncVar();

//code snippet

const calc = {
  total: 0,
  add(a) {
    this.total += a;
    return this;
  },
  substract(a) {
    this.total -= a;
    return this;
  },
  multiply(a) {
    this.total *= a;
    return this;
  },
};

const result = calc.add(10).multiply(5).substract(30).add(10);

// console.log(result.total);

/** print 0 1 2 using var keyboard in for loop */

function printNormalValues() {
  for (var i = 0; i < 3; i++) {
    function timer(i) {
      setTimeout(() => {
        console.log(i);
      });
    }
    timer(i);
  }
}

printNormalValues();
