//Bubbling and Capturing
// by default useCapture callback is false which means bubbling event is occured
//but true will make the capturing  occur

//true ==capturing
//false ==bubbling
//priority given to capturing if true is present

document.querySelector("#grandparent").addEventListener(
  "click",
  () => {
    console.log("grandparent");
  },
  false
);
document.querySelector("#parent").addEventListener(
  "click",
  (e) => {
    console.log("parent");
    e.stopPropagation();
  },
  false
);
document.querySelector("#child").addEventListener(
  "click",
  () => {
    console.log("child");
  },
  false
);

//function currying

const multiplyByNumber = (x, y) => {
  console.log(x * y);
};

multiplyByNumber(2, 4);

const something = multiplyByNumber.bind(this, 3, 6);

something();

// <script></script>
//In this case the html code parses then script is 
// executed and the html waits for the script to fisnish 
//then html parsing continues


// <script async></script>
// In Async html parsing and js code executes simultaneously


// <script defer></script>
// In Defer html parsing and js code executes simultaneously but
// when the HTML parsing is completed then only js code is executed



