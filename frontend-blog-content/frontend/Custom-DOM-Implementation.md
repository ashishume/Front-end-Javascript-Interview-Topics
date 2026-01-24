# Custom DOM Implementation in JavaScript

## Overview
Creating a custom DOM implementation demonstrates how the browser's DOM works internally. This involves building a tree structure with nodes that can have children, attributes, and text content, along with methods to create, append, and render elements.

## Basic Implementation

```javascript
/** Implement your own DOM */

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
      
      // Opening tag
      output += `${spaces}<${currentNode.name}>\n`;
      
      // innerHTML handling
      if (currentNode.innerHTML) {
        output += `${spaces}${getSpaces(INDENT_SIZE)}${currentNode.innerHTML}\n`;
      }
      
      // Loop for children
      for (let i = 0; i < currentNode.children.length; i++) {
        output += printTree(currentNode.children[i], currentLevel + 1);
      }

      // Closing tag
      output += `${spaces}</${currentNode.name}>\n`;

      return output;
    }
    console.log(printTree(this, 0));
  }
}

// Usage
const vDocument = new VDocument();
const body = vDocument.createElement("body");
const div = vDocument.createElement("div");

div.innerHTML = "Hello, I am a div!";
body.appendChild(div);
vDocument.appendChild(body);

vDocument.render();
```

## Enhanced Implementation

### With More DOM Methods
```javascript
class VNode {
  constructor(tagName) {
    this.tagName = tagName.toLowerCase();
    this.attributes = {};
    this.children = [];
    this.textContent = '';
    this.parentNode = null;
  }
  
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  
  getAttribute(name) {
    return this.attributes[name];
  }
  
  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }
  
  removeChild(child) {
    const index = this.children.indexOf(child);
    if (index > -1) {
      this.children.splice(index, 1);
      child.parentNode = null;
      return child;
    }
    return null;
  }
  
  querySelector(selector) {
    // Simple selector implementation
    if (selector.startsWith('.')) {
      const className = selector.slice(1);
      return this._findByClass(className);
    } else if (selector.startsWith('#')) {
      const id = selector.slice(1);
      return this._findById(id);
    } else {
      return this._findByTag(selector);
    }
  }
  
  _findByClass(className) {
    if (this.getAttribute('class') === className) {
      return this;
    }
    for (const child of this.children) {
      const found = child._findByClass(className);
      if (found) return found;
    }
    return null;
  }
  
  _findById(id) {
    if (this.getAttribute('id') === id) {
      return this;
    }
    for (const child of this.children) {
      const found = child._findById(id);
      if (found) return found;
    }
    return null;
  }
  
  _findByTag(tagName) {
    if (this.tagName === tagName) {
      return this;
    }
    for (const child of this.children) {
      const found = child._findByTag(tagName);
      if (found) return found;
    }
    return null;
  }
  
  toString(indent = 0) {
    const spaces = ' '.repeat(indent);
    let html = `${spaces}<${this.tagName}`;
    
    // Attributes
    for (const [name, value] of Object.entries(this.attributes)) {
      html += ` ${name}="${value}"`;
    }
    html += '>';
    
    // Text content
    if (this.textContent) {
      html += this.textContent;
    }
    
    // Children
    if (this.children.length > 0) {
      html += '\n';
      for (const child of this.children) {
        html += child.toString(indent + 2) + '\n';
      }
      html += spaces;
    }
    
    html += `</${this.tagName}>`;
    return html;
  }
}

class VDocument {
  constructor() {
    this.documentElement = new VNode('html');
    this.head = new VNode('head');
    this.body = new VNode('body');
    this.documentElement.appendChild(this.head);
    this.documentElement.appendChild(this.body);
  }
  
  createElement(tagName) {
    return new VNode(tagName);
  }
  
  createTextNode(text) {
    const node = new VNode('#text');
    node.textContent = text;
    return node;
  }
  
  getElementById(id) {
    return this.documentElement._findById(id);
  }
  
  querySelector(selector) {
    return this.documentElement.querySelector(selector);
  }
}
```

## Use Cases

### 1. Server-Side Rendering
```javascript
const doc = new VDocument();
const div = doc.createElement('div');
div.setAttribute('class', 'container');
doc.body.appendChild(div);
```

### 2. Virtual DOM
```javascript
// Create virtual DOM structure
const vDOM = new VDocument();
// Manipulate without touching real DOM
// Then render to actual DOM
```

## Best Practices

1. **Match Browser API**: Try to match native DOM API
2. **Performance**: Optimize for common operations
3. **Memory Management**: Clean up references
4. **Error Handling**: Validate operations
5. **Extensibility**: Allow for custom nodes
