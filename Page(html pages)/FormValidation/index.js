const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (name.value !== "" && email.value !== "") {
    const obj = {
      name: name.value,
      email: email.value,
    };
    console.log(obj);
    validate(name, email, true);
  } else {
    validate(name, email, false);
  }
});

function validate(name, email, isValid) {
  if (!isValid) {
    if (name.value === "" || name.value === undefined || name.value === null) {
      const span = document.createElement("span");
      const text = document.createTextNode("Name is required");
      span.appendChild(text);
      if (email.nextElementSibling.tagName !== "SPAN") name.insertAdjacentElement("afterend", span);
    }
    if (email.value === "" || email.value === undefined || email.value === null) {
      const span = document.createElement("span");
      const text = document.createTextNode("Email is required");
      span.appendChild(text);
      if (email.nextElementSibling.tagName !== "SPAN") email.insertAdjacentElement("afterend", span);
    }
  } else {
    const p = document.getElementsByTagName("span");
    for (let i = 0; i < p.length; i++) {
      console.log(p);
      p[i].style.display = "none";
    }
  }
}
