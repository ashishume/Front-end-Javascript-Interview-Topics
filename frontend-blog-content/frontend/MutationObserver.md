# MutationObserver API

## Overview
The MutationObserver interface provides the ability to watch for changes being made to the DOM tree. It is designed as a replacement for the older Mutation Events feature, which was part of the DOM3 Events specification. MutationObserver is also commonly referred to as DOM Observer.

## Basic Syntax

```javascript
const observer = new MutationObserver(callback);

// Start observing
observer.observe(target, options);

// Stop observing
observer.disconnect();

// Get all mutations
const mutations = observer.takeRecords();
```

## Basic Example

```javascript
const container = document.querySelector(".container");

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.log("DOM changed:", mutation);
  });
});

// Configuration options
const config = {
  childList: true,      // Observe direct children
  attributes: true,     // Observe attribute changes
  subtree: true,        // Observe all descendants
  attributeOldValue: true, // Include old attribute value
  characterData: true   // Observe text content changes
};

observer.observe(container, config);

// Trigger mutations
container.children[0].remove();
container.appendChild(document.createElement("div"));
```

## Configuration Options

```javascript
const options = {
  childList: true,              // Watch for child node additions/removals
  attributes: true,             // Watch for attribute changes
  attributeOldValue: true,      // Record old attribute value
  attributeFilter: ['class'],  // Only watch specific attributes
  characterData: true,          // Watch for text content changes
  characterDataOldValue: true, // Record old text content
  subtree: true                // Watch all descendants, not just direct children
};
```

## Mutation Types

### 1. ChildList Mutations

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      console.log('Added nodes:', mutation.addedNodes);
      console.log('Removed nodes:', mutation.removedNodes);
      console.log('Previous sibling:', mutation.previousSibling);
      console.log('Next sibling:', mutation.nextSibling);
    }
  });
});

observer.observe(container, { childList: true });
```

### 2. Attribute Mutations

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes') {
      console.log('Attribute:', mutation.attributeName);
      console.log('Old value:', mutation.oldValue);
      console.log('New value:', mutation.target.getAttribute(mutation.attributeName));
    }
  });
});

observer.observe(element, {
  attributes: true,
  attributeOldValue: true,
  attributeFilter: ['class', 'id'] // Only watch specific attributes
});
```

### 3. CharacterData Mutations

```javascript
const textNode = document.createTextNode('Initial text');

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'characterData') {
      console.log('Old text:', mutation.oldValue);
      console.log('New text:', mutation.target.textContent);
    }
  });
});

observer.observe(textNode, {
  characterData: true,
  characterDataOldValue: true
});

textNode.textContent = 'Updated text';
```

## Use Cases

### 1. Dynamic Content Monitoring

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          initializeNewElement(node);
        }
      });
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
```

### 2. Attribute Change Tracking

```javascript
const button = document.querySelector('.toggle-button');

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'aria-expanded') {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      updateUI(isExpanded);
    }
  });
});

observer.observe(button, {
  attributes: true,
  attributeFilter: ['aria-expanded']
});
```

### 3. Form Validation

```javascript
const form = document.querySelector('form');

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && 
        mutation.attributeName === 'class') {
      const hasError = mutation.target.classList.contains('error');
      updateErrorState(hasError);
    }
  });
});

observer.observe(form, {
  attributes: true,
  attributeFilter: ['class'],
  subtree: true
});
```

### 4. Third-Party Script Monitoring

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1 && node.tagName === 'SCRIPT') {
        console.log('New script added:', node.src);
        // Perform security checks or analytics
      }
    });
  });
});

observer.observe(document.head, {
  childList: true
});
```

## Performance Considerations

### 1. Debouncing Mutations

```javascript
let timeoutId;

const observer = new MutationObserver((mutations) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    // Process all mutations together
    processMutations(mutations);
  }, 100);
});
```

### 2. Filtering Relevant Mutations

```javascript
const observer = new MutationObserver((mutations) => {
  const relevantMutations = mutations.filter((mutation) => {
    // Only process mutations that matter
    return mutation.type === 'childList' && 
           mutation.addedNodes.length > 0;
  });
  
  if (relevantMutations.length > 0) {
    handleMutations(relevantMutations);
  }
});
```

### 3. Disconnecting When Not Needed

```javascript
class Component {
  constructor() {
    this.observer = new MutationObserver(this.handleMutations.bind(this));
  }
  
  startObserving(element) {
    this.observer.observe(element, { childList: true, subtree: true });
  }
  
  stopObserving() {
    this.observer.disconnect();
  }
  
  destroy() {
    this.stopObserving();
  }
}
```

## Browser Support

MutationObserver is supported in all modern browsers:
- Chrome 18+
- Firefox 14+
- Safari 6+
- Edge 12+
- IE 11+

## Differences from Mutation Events

| Feature | Mutation Events | MutationObserver |
|---------|----------------|------------------|
| Performance | Synchronous, can block | Asynchronous, non-blocking |
| API | Event-based | Callback-based |
| Batching | No | Yes |
| Status | Deprecated | Current standard |

## Best Practices

1. **Use specific options**: Only observe what you need
2. **Disconnect when done**: Prevent memory leaks
3. **Batch processing**: Handle multiple mutations efficiently
4. **Filter mutations**: Process only relevant changes
5. **Avoid infinite loops**: Don't modify DOM in observer callback

```javascript
const observer = new MutationObserver((mutations) => {
  // ❌ Bad: Modifying DOM can cause infinite loop
  // element.appendChild(newNode);
  
  // ✅ Good: Use requestAnimationFrame or setTimeout
  requestAnimationFrame(() => {
    updateDOM();
  });
});
```

## Summary

MutationObserver provides an efficient way to monitor DOM changes asynchronously. It's essential for building reactive applications, tracking dynamic content, and implementing features that need to respond to DOM mutations without performance penalties.

