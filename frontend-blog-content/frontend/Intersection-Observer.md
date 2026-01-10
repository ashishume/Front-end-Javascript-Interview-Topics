# Intersection Observer API

## Overview
The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or the viewport. It's commonly used for lazy loading images, infinite scrolling, and scroll-based animations.

## Basic Syntax

```javascript
const observer = new IntersectionObserver(callback, options);

// Start observing
observer.observe(element);

// Stop observing
observer.unobserve(element);

// Disconnect all
observer.disconnect();
```

## Basic Example

```javascript
const cards = document.querySelectorAll(".card");

const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target); // Stop observing once visible
    }
  });
};

const observer = new IntersectionObserver(callback);

cards.forEach((card) => {
  observer.observe(card);
});
```

## Configuration Options

```javascript
const options = {
  root: null,              // Viewport (default) or specific element
  rootMargin: "0px",      // Margin around root (like CSS margin)
  threshold: 0.5         // 0.0 to 1.0 - percentage of visibility
};

const observer = new IntersectionObserver(callback, options);
```

### Threshold Examples

```javascript
// Trigger when 100% visible
threshold: 1.0

// Trigger when 50% visible
threshold: 0.5

// Trigger at multiple points
threshold: [0, 0.25, 0.5, 0.75, 1.0]
```

## Entry Object Properties

```javascript
const callback = (entries) => {
  entries.forEach((entry) => {
    console.log(entry.isIntersecting);     // Boolean: is element visible?
    console.log(entry.intersectionRatio);  // Number: 0.0 to 1.0
    console.log(entry.target);             // Element being observed
    console.log(entry.boundingClientRect); // Element's bounding box
    console.log(entry.rootBounds);         // Root's bounding box
  });
};
```

## Infinite Scrolling Example

```javascript
const cardContainer = document.querySelector(".container");
const lastCardObserver = new IntersectionObserver((entries) => {
  const lastCard = entries[0];
  if (!lastCard.isIntersecting) return;
  
  loadNewCards();
  lastCardObserver.unobserve(lastCard.target);
  observeLastCard();
});

function loadNewCards() {
  for (let i = 1; i <= 10; i++) {
    const card = document.createElement("div");
    card.textContent = "New card";
    card.classList.add("card");
    cardContainer.append(card);
  }
}

function observeLastCard() {
  const lastCard = document.querySelector(".card:last-child");
  lastCardObserver.observe(lastCard);
}

observeLastCard();
```

## Lazy Loading Images

```javascript
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img);
});
```

## Performance Benefits

- **Non-blocking**: Runs asynchronously, doesn't block main thread
- **Efficient**: Better performance than scroll event listeners
- **Batched**: Multiple entries processed together
- **Automatic cleanup**: Can unobserve elements when done

## Key Points
- Replaces scroll event listeners for better performance
- Useful for lazy loading, infinite scrolling, and animations
- Configurable with `root`, `rootMargin`, and `threshold` options
- Entry object provides detailed intersection information
- Remember to unobserve elements when no longer needed

