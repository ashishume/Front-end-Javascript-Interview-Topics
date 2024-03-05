/** implement your own DOM */

const INDENT_SIZE = 4;
class Node {
  constructor(name) {
    this.name = name;
    this.innerHTML = "";
    this.children = [];
  }
  appendChild(node) {
    this.children.push(node);
  }
}
const getSpaces = (length) => {
  return new Array(length).fill(" ").join("");
};

class VDocument extends Node {
  constructor() {
    super("html");
  }

  createElement(nodeName) {
    return new Node(nodeName);
  }
  render() {
    function printTree(currentNode, currentLevel) {
      const spaces = getSpaces(currentLevel * INDENT_SIZE);
      let output = "";
      // opening tag
      output += `${spaces}<${currentNode.name}>\n`;
      // innerHTML handling
      if (currentNode.innerHTML) {
        output += `${spaces}${getSpaces(INDENT_SIZE)}${
          currentNode.innerHTML
        }\n`;
      }
      // loop for children
      for (let i = 0; i < currentNode.children.length; i++) {
        output += printTree(currentNode.children[i], currentLevel + 1);
      }

      // closing tag
      output += `${spaces}</${currentNode.name}>\n`;

      return output;
    }
    console.log(printTree(this, 0));
  }
}

const vDocument = new VDocument();
const body = vDocument.createElement("body");
const div = vDocument.createElement("div");

div.innerHTML = "Hello, I am a div!";
body.appendChild(div);
vDocument.appendChild(body);

vDocument.render();
