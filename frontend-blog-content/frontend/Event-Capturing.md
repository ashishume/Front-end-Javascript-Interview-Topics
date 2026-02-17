# Event Capturing in JavaScript

## Overview
Event capturing is the first phase of event propagation where events flow from the root element down to the target element. It's the opposite of event bubbling, which flows from the target up to the root. Understanding both phases is crucial for advanced event handling.

## Event Propagation Phases

JavaScript events have three phases:
1. **Capturing Phase**: Event travels from root to target (top to bottom)
2. **Target Phase**: Event reaches the target element
3. **Bubbling Phase**: Event travels from target to root (bottom to top)

## Basic Implementation

```javascript
// Bubbling and Capturing
// by default useCapture callback is false which means bubbling event is occurred
// but true will make the capturing occur

// true == capturing
// false == bubbling (default)
// capturing if true is present (top to bottom)
// bubbling if false is present (bottom to top)

document.querySelector("#grandparent").addEventListener(
  "click",
  () => {
    console.log("grandparent");
  },
  { capture: false }
);

document.querySelector("#parent").addEventListener(
  "click",
  (e) => {
    console.log("parent");
    // e.stopPropagation(); // event.stopPropagation() stops the move upwards, but on the current
    // element all other handlers will run.

    // To stop the bubbling and prevent handlers on the current element from running,
    // there's a method event.stopImmediatePropagation(). After it no other handlers execute.
  },
  { capture: false }
);

document.querySelector("#child").addEventListener(
  "click",
  () => {
    console.log("child");
  },
  { capture: false } // shorthand false and passed as callback
);
```

## Capturing vs Bubbling

### Capturing (Top to Bottom)
```javascript
// Event flows: grandparent → parent → child
document.querySelector("#grandparent").addEventListener("click", () => {
  console.log("grandparent - capturing");
}, true); // or { capture: true }

document.querySelector("#parent").addEventListener("click", () => {
  console.log("parent - capturing");
}, true);

document.querySelector("#child").addEventListener("click", () => {
  console.log("child - capturing");
}, true);
```

### Bubbling (Bottom to Top)
```javascript
// Event flows: child → parent → grandparent
document.querySelector("#grandparent").addEventListener("click", () => {
  console.log("grandparent - bubbling");
}, false); // default

document.querySelector("#parent").addEventListener("click", () => {
  console.log("parent - bubbling");
}, false);

document.querySelector("#child").addEventListener("click", () => {
  console.log("child - bubbling");
}, false);
```

## Complete Example

```javascript
// HTML structure:
// <div id="grandparent">
//   <div id="parent">
//     <div id="child">Click me</div>
//   </div>
// </div>

// Capturing phase (runs first)
document.getElementById("grandparent").addEventListener("click", () => {
  console.log("1. Grandparent (capturing)");
}, true);

document.getElementById("parent").addEventListener("click", () => {
  console.log("2. Parent (capturing)");
}, true);

document.getElementById("child").addEventListener("click", () => {
  console.log("3. Child (target)");
}, true);

// Bubbling phase (runs after)
document.getElementById("grandparent").addEventListener("click", () => {
  console.log("4. Grandparent (bubbling)");
}, false);

document.getElementById("parent").addEventListener("click", () => {
  console.log("5. Parent (bubbling)");
}, false);

// Output when clicking child:
// 1. Grandparent (capturing)
// 2. Parent (capturing)
// 3. Child (target)
// 5. Parent (bubbling)
// 4. Grandparent (bubbling)
```

## Stop Propagation

### stopPropagation()
```javascript
document.querySelector("#parent").addEventListener("click", (e) => {
  console.log("parent");
  e.stopPropagation(); // Stops event from propagating further
  // Other handlers on same element still run
}, true); // capturing
```

### stopImmediatePropagation()
```javascript
document.querySelector("#parent").addEventListener("click", (e) => {
  console.log("parent - first");
  e.stopImmediatePropagation(); // Stops all further handlers
}, true);

document.querySelector("#parent").addEventListener("click", (e) => {
  console.log("parent - second"); // This won't run
}, true);
```

## Use Cases

### 1. Early Event Handling
```javascript
// Handle event before it reaches target (capturing)
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("prevent-default")) {
    e.preventDefault();
    e.stopPropagation();
  }
}, true); // Use capturing to catch early
```

### 2. Event Delegation with Capturing
```javascript
// Handle events during capturing phase
document.querySelector(".container").addEventListener("click", (e) => {
  if (e.target.matches(".button")) {
    console.log("Button clicked during capture");
  }
}, true);
```

### 3. Priority Handling
```javascript
// High priority handler (capturing)
document.addEventListener("click", (e) => {
  if (e.target.closest(".modal")) {
    e.stopPropagation(); // Prevent other handlers
  }
}, true);

// Normal handlers (bubbling)
document.addEventListener("click", (e) => {
  console.log("Normal handler");
}, false);
```

## Event Phase Detection

```javascript
element.addEventListener("click", (e) => {
  switch(e.eventPhase) {
    case Event.CAPTURING_PHASE:
      console.log("Capturing phase");
      break;
    case Event.AT_TARGET:
      console.log("Target phase");
      break;
    case Event.BUBBLING_PHASE:
      console.log("Bubbling phase");
      break;
  }
}, true);
```

## Best Practices

1. **Use Bubbling by Default**: Most common use case
2. **Use Capturing for Early Handling**: When you need to catch events early
3. **Be Careful with stopPropagation**: Can break other handlers
4. **Document Your Choice**: Make it clear why you're using capturing
5. **Consider Event Delegation**: Often better than capturing
6. **Test Both Phases**: Ensure handlers work in both phases if needed

## Common Patterns

### Pattern 1: Prevent Default Early
```javascript
document.addEventListener("click", (e) => {
  if (e.target.matches("a.external")) {
    e.preventDefault();
  }
}, true); // Capture early
```

### Pattern 2: Global Handler
```javascript
// Global click handler (capturing)
document.addEventListener("click", (e) => {
  // Handle all clicks
}, true);
```

### Pattern 3: Conditional Propagation
```javascript
document.addEventListener("click", (e) => {
  if (shouldStop(e)) {
    e.stopPropagation();
  }
}, true);
```
