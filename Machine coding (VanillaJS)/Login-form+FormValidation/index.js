/** Create an input field or button */
function createElement(tag, type = "text", placeholder = "", textContent = "") {
  const div = document.createElement("div");
  div.classList.add(`input-field-container-${type}`);
  const element = document.createElement(tag);
  if (tag === "input") {
    element.setAttribute("type", type);
    element.setAttribute("placeholder", placeholder);
    div.append(element);
    return div;
  } else {
    element.textContent = textContent;
    element.setAttribute("type", "submit");
  }
  return element;
}

/** create a form with all the fields and event listeners */
function createForm() {
  const form = document.getElementById("form");
  form.append(
    createElement("input", "text", "Enter text..."),
    createElement("input", "password", "Enter password..."),
    createElement("button", undefined, undefined, "Submit")
  );
  form.addEventListener("submit", handleFormSubmit);
  form.addEventListener("input", handleFormValidation);
}

/** create err element if it doesnt exist */
function createErrorEl(fieldName) {
  if (!fieldName.querySelector(".error-message")) {
    const err = document.createElement("div");
    err.classList.add("error-message");
    err.textContent = "Field is required";
    fieldName.append(err);
  }
}

/** Handle form validation and remove error when fixed */
function handleFormValidation(e) {
  if (e.target.tagName === "INPUT") {
    const inputField = e.target.parentNode;
    const errorDiv = inputField.querySelector(".error-message");
    if (e.target.value.trim() !== "") {
      if (errorDiv) errorDiv.remove();
    } else {
      createErrorEl(inputField);
    }
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const username = form.querySelector('input[type="text"]').value;
  const password = form.querySelector('input[type="password"]').value;

  if (username.trim() !== "" && password.trim() !== "") {
    console.log("Username:", username);
    console.log("Password:", password);
  } else {
    createErrorEl(form.querySelector('input[type="text"]').parentNode);
    createErrorEl(form.querySelector('input[type="password"]').parentNode);
  }
}

createForm(); // create the html form
