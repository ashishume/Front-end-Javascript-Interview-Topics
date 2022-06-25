/** Alternate(polyfill) for getElementsByClassName() */
document.findByClass = function (requiredClass) {
  const root = this.body;
  function search(node) {
    let results = [];
    if (node.classList.contains(requiredClass)) {
      return node;
    }
    for (const element of node.children) {
      results = results.concat(search(element));
    }
    return results;
  }
  return search(root);
};
console.log(document.findByClass("container"));

