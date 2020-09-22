let counter = 0;
const add = () => {
  const value = document.querySelector("#idea").value;
  if (value == "") return false;
  const li = document.createElement("li");
  li.setAttribute("id", value);
  li.appendChild(document.createTextNode(value));
  document.querySelector("#list").appendChild(li);
  counter++;
  if (counter % 2 == 0) li.setAttribute("style", "color:red");
  document.querySelector("#idea").value = "";
};

let idCounter = 0;
const addNewInputField = () => {
  const field = document.querySelector("#field");
  const newField = document.createElement("input");
  newField.setAttribute("id", `element${idCounter++}`);
  newField.setAttribute("class", "form-control");
  newField.setAttribute("placeholder", `Enter Text ${idCounter}`);
  field.appendChild(newField);
};

const getValue = () => {
  let array = [];
  for (let i = 0; i < idCounter; i++) {
    const value = document.querySelector(`#element${i}`).value;
    const valide = validation(value);
    if (valide) array.push(value);
  }
  if (array.length === idCounter && array.length !== 0) {
    document.querySelector("#errorField").innerHTML = "";
    console.log(array);
  }

  // }
};
let error;
const validation = (value) => {
  if (value === "") {
    document.querySelector("#errorField").innerHTML = "Field cannot be empty";
    document.querySelector("#errorField").setAttribute("style", "color:red");
    return false;
  }

  return true;
};
