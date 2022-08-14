const container = document.querySelector(".container");

const observer = new MutationObserver((entries) => {
  console.log(entries);
});

observer.observe(container, { childList: true });

container.children[0].remove();
container.appendChild(document.createElement("div"));
