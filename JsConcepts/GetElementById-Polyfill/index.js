/** polyfill for getElementById */

document.getElementById = function (id) {
  // Traverse the DOM tree starting from document.body
  function traverse(node) {
    if (node && node.id === id) {
      return node; // Found the element with the specified ID
    }
    for (let i = 0; i < node.childNodes.length; i++) {
      const found = traverse(node.childNodes[i]);
      if (found) {
        return found; // Return the found element if any
      }
    }
    return null; // Element with the specified ID not found in this subtree
  }
  // Start traversal from document.body
  return traverse(document.body);
};

console.log(document.getCustomElementById("content1"));
