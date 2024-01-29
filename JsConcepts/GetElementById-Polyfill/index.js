/** polyfill for getElementById */
document.getCustomElementById = function (id) {
  const root = [document.documentElement];
  while (root.length) {
    const curr = root.shift();
    if (curr.id === id) {
      return curr;
    }
    if (curr.children.length) {
      root.push(...curr.children);
    }
  }
};

console.log(document.getCustomElementById("content1"));
