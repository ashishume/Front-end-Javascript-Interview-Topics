# GetElementsByClassName Polyfill in JavaScript

## Overview
A polyfill for `getElementsByClassName` implements the native DOM method's functionality using DOM traversal. This is useful for understanding how the method works internally, supporting older browsers, or creating custom implementations with additional features.

## Basic Implementation

```javascript
/** Polyfill for getElementsByClassName() */
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

console.log(document.findByClass("1"));
```

## Enhanced Implementation

### With Multiple Classes Support
```javascript
document.getElementsByClassNamePolyfill = function(className) {
  if (!className || typeof className !== "string") {
    return [];
  }
  
  const classes = className.trim().split(/\s+/).filter(Boolean);
  const results = [];
  
  function traverse(node) {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    
    // Check if node has all specified classes
    if (classes.every(cls => node.classList.contains(cls))) {
      results.push(node);
    }
    
    // Traverse children
    for (let child of node.children) {
      traverse(child);
    }
  }
  
  traverse(document.documentElement);
  return results;
};
```

### Returning HTMLCollection-like Object
```javascript
document.getElementsByClassNamePolyfill = function(className) {
  const results = [];
  
  function traverse(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.classList && node.classList.contains(className)) {
        results.push(node);
      }
      
      for (let child of node.children) {
        traverse(child);
      }
    }
  }
  
  traverse(document.documentElement || document.body);
  
  // Return array-like object similar to HTMLCollection
  return {
    length: results.length,
    item: function(index) {
      return results[index] || null;
    },
    namedItem: function(name) {
      return results.find(el => el.id === name || el.name === name) || null;
    },
    [Symbol.iterator]: function*() {
      for (let item of results) {
        yield item;
      }
    }
  };
};
```

## Complete Implementation

```javascript
document.getElementsByClassNamePolyfill = function(className) {
  // Validate input
  if (typeof className !== "string" || className === "") {
    return [];
  }
  
  // Use native method if available
  if (document.getElementsByClassName) {
    return document.getElementsByClassName(className);
  }
  
  // Split class names (support multiple classes)
  const classNames = className.trim().split(/\s+/).filter(Boolean);
  const results = [];
  
  // Recursive traversal
  function traverse(node) {
    // Only process element nodes
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    
    // Check if element has all specified classes
    if (classNames.every(name => {
      const classList = node.className ? node.className.split(/\s+/) : [];
      return classList.includes(name);
    })) {
      results.push(node);
    }
    
    // Traverse children
    for (let i = 0; i < node.childNodes.length; i++) {
      traverse(node.childNodes[i]);
    }
  }
  
  // Start from document root
  traverse(document.documentElement || document.body);
  
  return results;
};
```

## Iterative Implementation

```javascript
document.getElementsByClassNamePolyfill = function(className) {
  if (typeof className !== "string") {
    return [];
  }
  
  const classNames = className.trim().split(/\s+/).filter(Boolean);
  const results = [];
  const stack = [document.documentElement];
  
  while (stack.length > 0) {
    const node = stack.pop();
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      // Check classes
      const nodeClasses = (node.className || "").split(/\s+/);
      if (classNames.every(name => nodeClasses.includes(name))) {
        results.push(node);
      }
      
      // Add children to stack
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        stack.push(node.childNodes[i]);
      }
    }
  }
  
  return results;
};
```

## Use Cases

### 1. Browser Compatibility
```javascript
if (!document.getElementsByClassName) {
  document.getElementsByClassName = document.getElementsByClassNamePolyfill;
}
```

### 2. Custom Implementation
```javascript
Element.prototype.getElementsByClassNameCustom = function(className) {
  const results = [];
  
  function traverse(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.classList.contains(className)) {
        results.push(node);
      }
      for (let child of node.children) {
        traverse(child);
      }
    }
  }
  
  traverse(this);
  return results;
};
```

## Best Practices

1. **Use Native When Available**: Always prefer native methods
2. **Handle Edge Cases**: Empty strings, null, undefined
3. **Support Multiple Classes**: Handle space-separated class names
4. **Performance**: Use iterative approach for deep trees
5. **Type Checking**: Validate input types
6. **Documentation**: Document limitations and differences
