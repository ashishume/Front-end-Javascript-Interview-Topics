# Deserialize JSON to DOM Tree in JavaScript

## Overview
Deserializing JSON to DOM means converting a JSON representation of HTML structure back into actual DOM elements. This is the reverse operation of DOM serialization and is useful for dynamically creating DOM structures from data.

## Basic Implementation

```javascript
/** Convert JSON to DOM tree */

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

document.body.appendChild(jsonToDom(domTreeElements));
```

## Enhanced Implementation

### With Validation
```javascript
function jsonToDom(jsonData, options = {}) {
  const {
    validate = true,
    sanitize = false
  } = options;
  
  function createNode(nodeData) {
    // Validate structure
    if (validate && (!nodeData.tag || typeof nodeData.tag !== 'string')) {
      throw new Error('Invalid node data: missing tag');
    }
    
    const tag = sanitize ? sanitizeTag(nodeData.tag) : nodeData.tag;
    const node = document.createElement(tag);
    
    // Set attributes
    if (nodeData.attributes) {
      for (const [attr, value] of Object.entries(nodeData.attributes)) {
        if (sanitize && !isSafeAttribute(attr)) {
          continue;
        }
        node.setAttribute(attr, value);
      }
    }
    
    // Handle children
    if (nodeData.children) {
      for (const child of nodeData.children) {
        if (typeof child === 'string') {
          node.appendChild(document.createTextNode(child));
        } else if (typeof child === 'object' && child.tag) {
          node.appendChild(createNode(child));
        }
      }
    }
    
    return node;
  }
  
  return createNode(jsonData);
}

function sanitizeTag(tag) {
  // Only allow valid HTML tags
  const validTags = ['div', 'span', 'p', 'a', 'img', 'button', 'input', /* ... */];
  return validTags.includes(tag.toLowerCase()) ? tag : 'div';
}

function isSafeAttribute(attr) {
  // Whitelist safe attributes
  const safeAttrs = ['class', 'id', 'data-*', 'aria-*'];
  return safeAttrs.some(pattern => attr.match(new RegExp(pattern.replace('*', '.*'))));
}
```

## Use Cases

### 1. Dynamic Content Creation
```javascript
const template = {
  tag: "div",
  attributes: { class: "card" },
  children: [
    { tag: "h2", children: ["Title"] },
    { tag: "p", children: ["Content"] }
  ]
};

const card = jsonToDom(template);
document.body.appendChild(card);
```

### 2. Server-Side Rendering Alternative
```javascript
const serverData = {
  tag: "article",
  attributes: { id: "post-123" },
  children: [
    { tag: "h1", children: [post.title] },
    { tag: "div", children: [post.content] }
  ]
};

const article = jsonToDom(serverData);
```

## Best Practices

1. **Validate Input**: Check JSON structure before processing
2. **Sanitize**: Prevent XSS attacks
3. **Handle Errors**: Graceful error handling
4. **Performance**: Consider for small structures
5. **Security**: Never trust user input
