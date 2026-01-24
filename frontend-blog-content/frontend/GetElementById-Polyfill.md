# GetElementById Polyfill in JavaScript

## Overview
A polyfill for `getElementById` implements the native DOM method's functionality using alternative approaches. This is useful for understanding how DOM traversal works, creating custom implementations, or supporting environments where the native method might not be available.

## Basic Implementation

```javascript
/** Polyfill for getElementById */

document.getCustomElementById = function (id) {
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
```

## Enhanced Implementation

### With Document Root
```javascript
document.getCustomElementById = function(id) {
  if (!id || typeof id !== "string") {
    return null;
  }
  
  function traverse(node) {
    // Check current node
    if (node && node.id === id) {
      return node;
    }
    
    // Traverse children
    if (node && node.childNodes) {
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        const found = traverse(child);
        if (found) {
          return found;
        }
      }
    }
    
    return null;
  }
  
  // Start from document root
  return traverse(document.documentElement) || traverse(document.body);
};
```

### Iterative Approach
```javascript
document.getCustomElementById = function(id) {
  if (!id || typeof id !== "string") {
    return null;
  }
  
  // Use stack for iterative traversal
  const stack = [document.documentElement];
  
  while (stack.length > 0) {
    const node = stack.pop();
    
    if (node && node.id === id) {
      return node;
    }
    
    // Add children to stack
    if (node && node.childNodes) {
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        stack.push(node.childNodes[i]);
      }
    }
  }
  
  return null;
};
```

### Using querySelector (Modern)
```javascript
document.getCustomElementById = function(id) {
  if (!id || typeof id !== "string") {
    return null;
  }
  
  // Use querySelector as fallback
  if (document.querySelector) {
    return document.querySelector(`#${CSS.escape(id)}`);
  }
  
  // Fallback to traversal
  return traverseDOM(document.documentElement, id);
};
```

## Complete Implementation

```javascript
document.getCustomElementById = function(id) {
  // Validate input
  if (id == null || typeof id !== "string" || id === "") {
    return null;
  }
  
  // Use native method if available
  if (document.getElementById) {
    return document.getElementById(id);
  }
  
  // Custom implementation
  function traverse(node) {
    // Check if node has the target ID
    if (node && node.nodeType === Node.ELEMENT_NODE && node.id === id) {
      return node;
    }
    
    // Traverse children
    if (node && node.childNodes) {
      for (let child of node.childNodes) {
        const found = traverse(child);
        if (found) {
          return found;
        }
      }
    }
    
    return null;
  }
  
  // Start from document root
  return traverse(document.documentElement) || traverse(document.body);
};
```

## Performance Optimized Version

```javascript
document.getCustomElementById = function(id) {
  if (!id || typeof id !== "string") {
    return null;
  }
  
  // Use native if available (fastest)
  if (document.getElementById) {
    return document.getElementById(id);
  }
  
  // Use querySelector if available
  if (document.querySelector) {
    try {
      return document.querySelector(`#${CSS.escape(id)}`);
    } catch (e) {
      // Fallback to traversal
    }
  }
  
  // Custom traversal (slowest)
  const stack = [document.documentElement];
  const visited = new WeakSet();
  
  while (stack.length > 0) {
    const node = stack.pop();
    
    if (visited.has(node)) continue;
    visited.add(node);
    
    if (node.nodeType === Node.ELEMENT_NODE && node.id === id) {
      return node;
    }
    
    if (node.childNodes) {
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        const child = node.childNodes[i];
        if (child.nodeType === Node.ELEMENT_NODE) {
          stack.push(child);
        }
      }
    }
  }
  
  return null;
};
```

## Use Cases

### 1. Learning DOM Traversal
```javascript
// Understanding how getElementById works internally
function explainGetElementById(id) {
  console.log("Searching for element with ID:", id);
  let steps = 0;
  
  function traverse(node, depth = 0) {
    steps++;
    const indent = "  ".repeat(depth);
    console.log(`${indent}Checking: ${node.nodeName}${node.id ? ` (id="${node.id}")` : ""}`);
    
    if (node.id === id) {
      console.log(`${indent}✓ Found!`);
      return node;
    }
    
    for (let child of node.childNodes) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const found = traverse(child, depth + 1);
        if (found) return found;
      }
    }
    
    return null;
  }
  
  const result = traverse(document.body);
  console.log(`Total steps: ${steps}`);
  return result;
}
```

### 2. Custom ID Resolution
```javascript
document.getCustomElementById = function(id, options = {}) {
  const {
    caseSensitive = true,
    searchIn = document.body,
    stopOnFirst = true
  } = options;
  
  function traverse(node) {
    let nodeId = node.id;
    if (!caseSensitive) {
      nodeId = nodeId?.toLowerCase();
      id = id.toLowerCase();
    }
    
    if (nodeId === id) {
      return node;
    }
    
    for (let child of node.childNodes) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const found = traverse(child);
        if (found && stopOnFirst) {
          return found;
        }
      }
    }
    
    return null;
  }
  
  return traverse(searchIn);
};
```

### 3. Multiple Elements with Same ID (Non-standard)
```javascript
document.getCustomElementsById = function(id) {
  const results = [];
  
  function traverse(node) {
    if (node.nodeType === Node.ELEMENT_NODE && node.id === id) {
      results.push(node);
    }
    
    for (let child of node.childNodes) {
      traverse(child);
    }
  }
  
  traverse(document.body);
  return results;
};
```

## Comparison with Native Method

### Native getElementById
```javascript
// Fast, optimized by browser
const element = document.getElementById("myId");
```

### Custom Implementation
```javascript
// Slower, but customizable
const element = document.getCustomElementById("myId");
```

## Best Practices

1. **Use Native When Available**: Always prefer native methods
2. **Validate Input**: Check for null/undefined/empty strings
3. **Handle Edge Cases**: Document fragments, shadow DOM
4. **Performance**: Use iterative approach for deep trees
5. **Error Handling**: Handle invalid IDs gracefully
6. **Testing**: Test with various DOM structures

## Common Issues

### Issue 1: Not Checking Node Type
```javascript
// ❌ Wrong: Checks text nodes
function traverse(node) {
  if (node.id === id) return node;
  // ...
}

// ✅ Correct: Only check element nodes
function traverse(node) {
  if (node.nodeType === Node.ELEMENT_NODE && node.id === id) {
    return node;
  }
  // ...
}
```

### Issue 2: Not Handling Document Fragment
```javascript
// ✅ Handle document fragments
function getElementById(id, root = document) {
  function traverse(node) {
    if (node.nodeType === Node.ELEMENT_NODE && node.id === id) {
      return node;
    }
    // Handle both regular nodes and document fragments
    const children = node.childNodes || node.children;
    for (let child of children) {
      const found = traverse(child);
      if (found) return found;
    }
    return null;
  }
  return traverse(root);
}
```

## Real-World Example

```javascript
class CustomDOM {
  static getElementById(id, root = document) {
    // Validate
    if (!id || typeof id !== "string") {
      throw new TypeError("ID must be a non-empty string");
    }
    
    // Use native if available
    if (root.getElementById) {
      return root.getElementById(id);
    }
    
    // Custom implementation
    const stack = [root.documentElement || root];
    
    while (stack.length > 0) {
      const node = stack.pop();
      
      if (node.nodeType === Node.ELEMENT_NODE && node.id === id) {
        return node;
      }
      
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push(node.children[i]);
        }
      }
    }
    
    return null;
  }
  
  static getAllElementsById(id) {
    const results = [];
    const stack = [document.documentElement];
    
    while (stack.length > 0) {
      const node = stack.pop();
      
      if (node.nodeType === Node.ELEMENT_NODE && node.id === id) {
        results.push(node);
      }
      
      if (node.children) {
        for (let child of node.children) {
          stack.push(child);
        }
      }
    }
    
    return results;
  }
}
```
