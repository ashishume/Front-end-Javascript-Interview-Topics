const domTreeElements = {
  tag: "div",
  attributes: {
    class: "parent",
  },
  children: [
    "This is sample tree",
    {
      tag: "span",
      attributes: {},
      children: ["Again find a word is difficult"],
    },
    {
      tag: "section",
      attributes: {},
      children: [
        "my self ashish, find the sample tree here",
        {
          tag: "span",
          attributes: {},
          children: ["sample word here"],
        },
      ],
    },
  ],
};
// Create a method to convert JSON object to DOM tree elements
function jsonToDom(jsonData) {
  function createNode(nodeData) {
    const node = document.createElement(nodeData.tag);

    // Set attributes
    for (const [attr, value] of Object.entries(nodeData.attributes)) {
      node.setAttribute(attr, value);
    }

    // Append child nodes
    for (const child of nodeData.children) {
      if (typeof child === "string") {
        node.appendChild(document.createTextNode(child));
      } else {
        node.appendChild(createNode(child));
      }
    }

    return node;
  }

  return createNode(jsonData);
}

document.body.appendChild(jsonToDom(domTreeElements)); // prints into html
