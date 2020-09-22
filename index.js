// checkEmptyValidation = (value) => {
//   if (value == "") {
//     // const node = document.createElement("p"); // Create a <li> node
//     // const errorMessage = document.createTextNode("All fields are required");
//     // node.append(errorMessage);
//     document.querySelector("#message").innerHTML = "All fields are required";
//     return false;
//   }
//   document.querySelector("#message").innerHTML = "";
//   return true;
// };

// document.querySelector("#form").addEventListener("submit", (e) => {
//   e.preventDefault();

//   if (
//     checkEmptyValidation(e.target[0].value) &&
//     checkEmptyValidation(e.target[1].value) &&
//     checkEmptyValidation(e.target[2].value)
//   ) {
//     const name = e.target[0].value;
//     const email = e.target[1].value;
//     const password = e.target[2].value;

//     const body = {
//       name,
//       email,
//       password,
//     };
//     console.log(body);
//   }
// });


// For practice

// let counter = 0;
// document.querySelector("#button").addEventListener("click", (e) => {
//   const fieldData = document.querySelector("#field").value;
//   if (fieldData == "") {
//     document.querySelector("#root").innerHTML = "Required";
//     return false;
//   }
//   counter++;
//   console.log(counter);
//   const li = document.createElement("li");
//   if (counter % 2 == 0) {
//     li.setAttribute("style", "color:red");
//   }
//   const text = document.createTextNode(fieldData);
//   li.appendChild(text);
//   document.querySelector("#list").appendChild(li);
//   document.querySelector("#field").value = "";
// });
