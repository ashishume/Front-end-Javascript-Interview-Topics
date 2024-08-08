/**
 * The MutationObserver interface provides the ability to watch for changes being made to the DOM tree.
 * It is designed as a replacement for the older Mutation Events feature, which was part of the DOM3 Events
 * specification.
 * 
 * mutation observer is also called DOM Observer
 */
const container = document.querySelector(".container");

const observer = new MutationObserver((entries) => {
  console.log(entries);
});

// Options for the observer (which mutations to observe)
const config = { childList: true, attributes: true, childList: true, subtree: true };

observer.observe(container, config);

container.children[0].remove();
container.appendChild(document.createElement("div"));
