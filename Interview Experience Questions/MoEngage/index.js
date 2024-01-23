/**
 * 
 * 
var x = "global";
var y = function () {
    console.log(this.x);
};
y();
y.bind(this);
y();
new y();
-----------------------------

function foo() {
  console.log(i); // ReferenceError: Cannot access 'i' before initialization
  let i = 42;
}

foo();


-----------------------------

function list (){
    return [].slice.call(arguments)
} 
var temp=list.bind(null,37)
var temp2=temp()
console.log(temp2)

-----------------------------

which of them is corrwct
h2 - p
h2 + p
h2 p
h2 > p

*/