# ResizeObserver API

## Overview
The ResizeObserver API provides a way to asynchronously observe changes to the dimensions of an element's content or border box. It's useful for tracking size changes of elements dynamically, which is particularly helpful for responsive layouts and adaptive components.

## Basic Syntax

```javascript
const observer = new ResizeObserver(callback);

// Start observing
observer.observe(element);

// Stop observing
observer.unobserve(element);

// Disconnect all
observer.disconnect();
```

## Basic Example

```javascript
const container = document.querySelector(".container");
const side = document.querySelector(".container-side");

const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const { target, contentRect, borderBoxSize } = entry;
    
    console.log(`Element ${target.className} resized:`, {
      width: contentRect.width,
      height: contentRect.height,
      borderBoxSize: borderBoxSize[0]
    });
  });
});

// Start observing both elements
resizeObserver.observe(container);
resizeObserver.observe(side);
```

## Entry Properties

The callback receives an array of `ResizeObserverEntry` objects, each containing:

- **target**: The element being observed
- **contentRect**: A DOMRectReadOnly object with size information
  - `width`: Width of the content box
  - `height`: Height of the content box
  - `top`, `left`, `right`, `bottom`: Position information
- **borderBoxSize**: Array of objects with border box dimensions
- **contentBoxSize**: Array of objects with content box dimensions
- **devicePixelContentBoxSize**: Array of objects with device pixel dimensions

## Use Cases

### 1. Responsive Component Adjustments

```javascript
const card = document.querySelector(".card");
const resizeObserver = new ResizeObserver((entries) => {
  const entry = entries[0];
  if (entry.contentRect.width < 600) {
    card.classList.add("mobile-layout");
  } else {
    card.classList.remove("mobile-layout");
  }
});

resizeObserver.observe(card);
```

### 2. Canvas Resizing

```javascript
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const resizeObserver = new ResizeObserver((entries) => {
  const entry = entries[0];
  canvas.width = entry.contentRect.width;
  canvas.height = entry.contentRect.height;
  // Redraw canvas content
  redrawCanvas();
});

resizeObserver.observe(canvas);
```

### 3. Chart Updates

```javascript
const chartContainer = document.querySelector(".chart");
let chartInstance = null;

const resizeObserver = new ResizeObserver((entries) => {
  const entry = entries[0];
  if (chartInstance) {
    chartInstance.resize(entry.contentRect.width, entry.contentRect.height);
  }
});

resizeObserver.observe(chartContainer);
```

## Performance Considerations

- ResizeObserver callbacks are called asynchronously, which helps with performance
- Multiple resize events may be batched together
- Use `requestAnimationFrame` for expensive operations in callbacks

```javascript
let rafId = null;

const resizeObserver = new ResizeObserver((entries) => {
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
  
  rafId = requestAnimationFrame(() => {
    // Expensive operations here
    entries.forEach((entry) => {
      updateLayout(entry);
    });
  });
});
```

## Browser Support

ResizeObserver is supported in all modern browsers:
- Chrome 64+
- Firefox 69+
- Safari 13.1+
- Edge 79+

## Key Differences from Other Observers

- **IntersectionObserver**: Observes visibility/intersection
- **MutationObserver**: Observes DOM changes
- **ResizeObserver**: Specifically observes size changes

## Best Practices

1. **Clean up observers**: Always disconnect when done
2. **Debounce expensive operations**: Use `requestAnimationFrame` for heavy computations
3. **Observe only necessary elements**: Don't observe too many elements simultaneously
4. **Handle errors**: Wrap observer logic in try-catch blocks

```javascript
class ResponsiveComponent {
  constructor(element) {
    this.element = element;
    this.observer = new ResizeObserver(this.handleResize.bind(this));
    this.observer.observe(this.element);
  }
  
  handleResize(entries) {
    // Handle resize logic
  }
  
  destroy() {
    this.observer.disconnect();
  }
}
```

## Summary

ResizeObserver is a powerful API for tracking element size changes, enabling responsive and adaptive UI components. It provides an efficient way to react to layout changes without polling or using resize event listeners on the window.

