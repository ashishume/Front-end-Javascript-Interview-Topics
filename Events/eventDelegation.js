// document.querySelector("#root").addEventListener("click", (e) => {
//   // console.log(e);

// });

var array = [1, 2, 3, 4, 5,6,]
for(var i = 0; i < array.length; i++) {
  delay(i)
}
function delay(i) {
  setTimeout(() => {
    console.log(array[i])
  }, 1000);
}