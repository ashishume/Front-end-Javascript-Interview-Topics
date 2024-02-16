const starContainer = document.querySelector(".star");
const starItem = document.getElementsByClassName("star-item");

const childNodesCount = starContainer.children.length;
const childNodes = starContainer.children;
const highlight = "green";
const defaultColor = "rgb(210, 210, 20)";

starContainer.addEventListener("mouseover", (e) => {
  hoverEffect(e.target);
});
starContainer.addEventListener("click", (e) => {
  highlightStars(e.target);
});

function hoverEffect(starItem) {
  if (starItem.className === "star-item") {
    for (let i = 0; i < childNodesCount; i++) {
      /** highlight all the nodes including which is being hovered and then break */
      childNodes[i].style.background = highlight;
      if (getDataAttribute(childNodes[i]) === getDataAttribute(starItem)) {
        break;
      }
    }
    for (let i = childNodesCount - 1; i >= 0; i--) {
      /** add default color 1 behind so that on hover it does not color the hovered star (backwards) */
      if (getDataAttribute(childNodes[i]) !== getDataAttribute(starItem)) {
        childNodes[i].style.background = defaultColor;
      } else {
        break;
      }
    }
  }
}

starContainer.addEventListener("mouseleave", (e) => {
  for (let i = 0; i < childNodesCount; i++) {
    childNodes[i].style.background = defaultColor;
  }
});

function highlightStars(starItem) {
  for (let i = 0; i < childNodesCount; i++) {
    childNodes[i].style.background = "gold";
    if (getDataAttribute(childNodes[i]) === getDataAttribute(starItem)) {
      break;
    }
  }
}

function getDataAttribute(node) {
  return parseInt(node.getAttribute("data-value"));
}
