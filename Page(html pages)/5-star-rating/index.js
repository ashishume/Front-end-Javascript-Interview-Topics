const starContainer = document.querySelector(".star");
const starItem = document.getElementsByClassName("star-item");

const childNodesCount = starContainer.children.length;
const childNodes = starContainer.children;
const highlight = "green";
const defaultColor = "rgb(210, 210, 20)";
starContainer.addEventListener("mouseover", (e) => {
  if (e.target.className === "star-item") {
    const starItem = e.target;
    for (let i = 0; i < childNodesCount; i++) {
      childNodes[i].style.background = highlight;
      if (
        parseInt(childNodes[i].getAttribute("data-value")) ===
        parseInt(starItem.getAttribute("data-value"))
      ) {
        break;
      }
    }
    for (let i = childNodesCount - 1; i >= 0; i--) {
      if (
        parseInt(childNodes[i].getAttribute("data-value")) !==
        parseInt(starItem.getAttribute("data-value"))
      ) {
        childNodes[i].style.background = defaultColor;
      } else {
        break;
      }
    }
  }
});
starContainer.addEventListener("mouseleave", (e) => {
  for (let i = 0; i < childNodesCount; i++) {
    childNodes[i].style.background = defaultColor;
  }
});
