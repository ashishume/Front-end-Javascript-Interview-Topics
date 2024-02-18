// Diff bw function statement and func expression

func1("Arguments"); //when we pass through function those are called args
// func2(); //shows refrence error as it is a func expression

//Function statement where functions can be accessed even before writing it. (Function declaration)
function func1(Parameters) {
  //when we receive from func those are called params
  console.log("func1", Parameters);
}

//Function Expression cannot be accessed before declaring the functions
const func2 = function () {
  console.log("func2");
};
//Named Function Expression
const namedFunc = function xyz() {
  console.log("namedFunc");
};

//Anonymous function are used as values when we need to assign the functions to some variable we use this type of functions
// function(){
// }



//First class function
//passsing function in arguments inside a function is called first class function
function funcSample(params) {
  console.log(params);
}

funcSample(function () {
  console.log("passsed as args");
});
