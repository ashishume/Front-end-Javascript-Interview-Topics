
function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.outerHTML);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    // Retrieve the HTML content from the dataTransfer object
    const data = ev.dataTransfer.getData("text/plain");

    // Create a new div with the dragged content
    const draggedElement = document.createElement("div");
    draggedElement.innerHTML = data;

    // Append the cloned element to the drop target
    ev.target.appendChild(draggedElement.firstChild);

    // Remove the original dragged element
    ev.target.previousElementSibling.remove();
}
