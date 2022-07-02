// document.addEventListener("click", () => {
//   //   console.log("Hey");
// });
// document.addEventListener("click", () => {
//   //   console.log("Hello");
// });

// onclick = "func1()";

// function func1() {
//     console.log("Publish");
// }

// function func2() {}

class Publisher {
    constructor() {
      this.abc = "";
    }
  
    publish(e, data) {}
  
    subscribe(e, callback) {}
  }
  const obj = new Publisher();
  obj.subscribe("newsPaper", () => {
    console.log("hi");
  });
  
  const obj2 = new Publisher();
  
  obj2.subscribe("newsPaper", () => {
    console.log("hey");
  });
  
  // const obj = {
  //   name: "Ashsh",
  // };
  // funcc1.bind(obj, 20);
  
  // function bindSample(context, arguments) {
  
  // }
  
  // .parent{
  //     display:flex;
  //     justify-content:center;
  // }
  
  
  // function debounce(func,delay){
  //     let debouce;
  //     clearTimeout(debouce);
  //     debouce=setTimeout(()=>func.apply(this,arguments),delay)
  // }
  
  // const funcCall=debounce(apiCall,300);
  
  // const promise = new Promise((res, rej) => {
  //   setTimeout(() => {
  //     res("solved");
  //   }, 10000);
  
  //   rej("erro");
  // });
  