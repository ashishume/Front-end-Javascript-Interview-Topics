# Drag and Drop API in JavaScript

## Overview
The HTML5 Drag and Drop API allows users to drag elements and drop them into target areas. This API provides a native way to implement drag-and-drop functionality without external libraries, making it perfect for file uploads, reordering lists, and interactive interfaces.

## Basic Implementation

```javascript
function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.outerHTML);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    // Retrieve the HTML content from the dataTransfer object
    const data = ev.dataTransfer.getData("text/plain");

    // Create a new div with the dragged content
    const draggedElement = document.createElement("div");
    draggedElement.innerHTML = data;

    // Append the cloned element to the drop target
    ev.target.appendChild(draggedElement.firstChild);

    // Remove the original dragged element
    ev.target.previousElementSibling.remove();
}
```

## HTML Setup

```html
<!-- Draggable element -->
<div draggable="true" ondragstart="drag(event)">
  Drag me
</div>

<!-- Drop target -->
<div ondrop="drop(event)" ondragover="allowDrop(event)">
  Drop here
</div>
```

## Drag Events

### On Draggable Element
- **ondragstart**: Fires when dragging starts
- **ondrag**: Fires continuously while dragging
- **ondragend**: Fires when dragging ends

### On Drop Target
- **ondragenter**: Fires when dragged element enters drop target
- **ondragover**: Fires continuously while over drop target
- **ondragleave**: Fires when dragged element leaves drop target
- **ondrop**: Fires when element is dropped

## DataTransfer Object

The `dataTransfer` object stores data during drag operations.

### Setting Data
```javascript
function dragStart(e) {
  // Set text data
  e.dataTransfer.setData("text/plain", "Hello World");
  
  // Set custom data
  e.dataTransfer.setData("application/json", JSON.stringify({ id: 123 }));
  
  // Set HTML
  e.dataTransfer.setData("text/html", e.target.outerHTML);
}
```

### Getting Data
```javascript
function drop(e) {
  e.preventDefault();
  
  // Get text data
  const text = e.dataTransfer.getData("text/plain");
  
  // Get custom data
  const json = JSON.parse(e.dataTransfer.getData("application/json"));
  
  // Get HTML
  const html = e.dataTransfer.getData("text/html");
}
```

## Complete Example

```javascript
class DragAndDrop {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.setupDragAndDrop();
  }
  
  setupDragAndDrop() {
    // Make all children draggable
    Array.from(this.container.children).forEach(item => {
      item.draggable = true;
      item.addEventListener("dragstart", (e) => this.handleDragStart(e));
      item.addEventListener("dragend", (e) => this.handleDragEnd(e));
    });
    
    // Setup drop zones
    this.container.addEventListener("dragover", (e) => this.handleDragOver(e));
    this.container.addEventListener("drop", (e) => this.handleDrop(e));
  }
  
  handleDragStart(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    e.dataTransfer.setData("text/plain", e.target.id);
    e.target.classList.add("dragging");
  }
  
  handleDragEnd(e) {
    e.target.classList.remove("dragging");
  }
  
  handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = "move";
    return false;
  }
  
  handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    
    const draggedId = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(draggedId);
    const dropTarget = e.target.closest(".drop-target") || this.container;
    
    if (draggedElement && dropTarget) {
      dropTarget.appendChild(draggedElement);
    }
    
    return false;
  }
}
```

## File Drag and Drop

```javascript
function setupFileDrop(dropZone) {
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.add("drag-over");
  });
  
  dropZone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove("drag-over");
  });
  
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove("drag-over");
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  });
}

function handleFiles(files) {
  Array.from(files).forEach(file => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        displayImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
}
```

## Visual Feedback

```javascript
function setupVisualFeedback() {
  const draggable = document.querySelector(".draggable");
  const dropZone = document.querySelector(".drop-zone");
  
  draggable.addEventListener("dragstart", () => {
    draggable.style.opacity = "0.5";
  });
  
  draggable.addEventListener("dragend", () => {
    draggable.style.opacity = "1";
  });
  
  dropZone.addEventListener("dragenter", () => {
    dropZone.classList.add("drag-over");
  });
  
  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over");
  });
}
```

## Advanced: Sortable List

```javascript
class SortableList {
  constructor(listId) {
    this.list = document.getElementById(listId);
    this.setupSortable();
  }
  
  setupSortable() {
    Array.from(this.list.children).forEach((item, index) => {
      item.draggable = true;
      item.dataset.index = index;
      item.addEventListener("dragstart", (e) => this.onDragStart(e));
    });
    
    this.list.addEventListener("dragover", (e) => this.onDragOver(e));
    this.list.addEventListener("drop", (e) => this.onDrop(e));
  }
  
  onDragStart(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    e.dataTransfer.setData("text/plain", e.target.dataset.index);
    e.target.style.opacity = "0.4";
  }
  
  onDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = "move";
    
    const afterElement = this.getDragAfterElement(this.list, e.clientY);
    const dragging = document.querySelector(".dragging");
    if (afterElement == null) {
      this.list.appendChild(dragging);
    } else {
      this.list.insertBefore(dragging, afterElement);
    }
  }
  
  getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".item:not(.dragging)")];
    
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
  
  onDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const items = Array.from(this.list.children);
    const newIndex = items.indexOf(e.target);
    
    if (draggedIndex !== newIndex) {
      const draggedItem = items[draggedIndex];
      this.list.removeChild(draggedItem);
      this.list.insertBefore(draggedItem, items[newIndex]);
    }
    
    return false;
  }
}
```

## DataTransfer Properties

```javascript
function handleDragStart(e) {
  // Set drag effect
  e.dataTransfer.effectAllowed = "copy"; // or "move", "link", "copyMove", etc.
  
  // Set drop effect
  e.dataTransfer.dropEffect = "move";
  
  // Set custom drag image
  const dragImage = document.createElement("div");
  dragImage.textContent = "Custom drag image";
  e.dataTransfer.setDragImage(dragImage, 0, 0);
  
  // Set data
  e.dataTransfer.setData("text/plain", "data");
  
  // Files (read-only)
  const files = e.dataTransfer.files;
}
```

## Use Cases

### 1. File Upload
```javascript
const dropZone = document.getElementById("drop-zone");

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files);
  uploadFiles(files);
});
```

### 2. Kanban Board
```javascript
class KanbanBoard {
  moveCard(cardId, fromColumn, toColumn) {
    const card = document.getElementById(cardId);
    toColumn.appendChild(card);
    this.updateCardPosition(cardId, toColumn.id);
  }
}
```

### 3. Shopping Cart
```javascript
function addToCart(productId) {
  const product = document.getElementById(productId);
  const cart = document.getElementById("cart");
  cart.appendChild(product.cloneNode(true));
}
```

## Best Practices

1. **Always preventDefault**: On dragover and drop events
2. **Provide Visual Feedback**: Show drag state clearly
3. **Handle Edge Cases**: Check for valid drop targets
4. **Clean Up**: Remove event listeners when done
5. **Accessibility**: Provide keyboard alternatives
6. **Mobile Support**: Consider touch events for mobile

## Browser Compatibility

Drag and Drop API is supported in all modern browsers. For older browsers, consider using libraries like SortableJS or interact.js.

## Common Issues

### Issue 1: Drop not working
```javascript
// Solution: Always preventDefault on dragover
element.addEventListener("dragover", (e) => {
  e.preventDefault(); // Required!
});
```

### Issue 2: Drag image not showing
```javascript
// Solution: Set drag image before setting data
e.dataTransfer.setDragImage(customImage, 0, 0);
e.dataTransfer.setData("text/plain", "data");
```

### Issue 3: Data not transferring
```javascript
// Solution: Use same data type for get and set
e.dataTransfer.setData("text/plain", data);
const retrieved = e.dataTransfer.getData("text/plain");
```
