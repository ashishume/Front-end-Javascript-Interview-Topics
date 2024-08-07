//  https://codesandbox.io/s/event-loop-7izqb

// import "./styles.css";

document.getElementById("app").innerHTML = `
<button  class="primary" onclick="btnClick(event)">Button</button>
`;

function btnClick(event) {
  console.log(event);
}

function logger1(string) {
  console.log("logger1");

  Promise.resolve().then(() => {
    console.log("promise logger 1");
  });
}

function logger2(string) {
  console.log("logger 2");

  Promise.resolve().then(() => {
    console.log("promise logger 2");
  });
}

document.getElementsByTagName("button")[0].addEventListener("click", logger1);
document.getElementsByTagName("button")[0].addEventListener("click", logger2);

// document.getElementsByTagName("button")[0].click();
/** 
CORRECT OUTPUT:

pointer event (....)

logger1
promise logger 1
logger 2
promise logger 2
*/
