const container = document.querySelector(".breadcrumb");
container.setAttribute("onclick", "itemClick(event)");

let spanItems = [];
const stringValues = ["ABC", "fshkj", "tuoertiu", "nmxcnvn"];
function generateALink() {
  stringValues.forEach((value, index) => {
    const span = document.createElement("a");
    span.textContent = value;
    span.id = index;
    spanItems.push(span);
  });
}
function generateArrow() {
  const arrow = document.createElement("span");
  arrow.innerHTML = "&nbsp;>&nbsp;";
  return arrow;
}

function addArrowInChild() {
  spanItems.forEach((value, index) => {
    if (index !== spanItems.length - 1) {
      value.appendChild(generateArrow());
    }
    container.appendChild(value);
  });
}

function itemClick(e) {
  console.log(e.target.textContent);
}

generateALink();
generateArrow();
addArrowInChild();
