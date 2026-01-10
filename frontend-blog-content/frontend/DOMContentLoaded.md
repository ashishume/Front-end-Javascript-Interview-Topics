# DOMContentLoaded Event

## Overview
The `DOMContentLoaded` event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading. It's the preferred event for executing JavaScript that manipulates the DOM.

## When DOMContentLoaded Fires

The event fires when:
1. ✅ The initial HTML document has been completely parsed
2. ✅ All deferred scripts (`<script defer>`) have downloaded and executed
3. ✅ Module scripts (`<script type="module">`) have downloaded and executed
4. ❌ Does NOT wait for:
   - Images
   - Subframes
   - Async scripts (`<script async>`)
   - Stylesheets (though deferred scripts wait for stylesheets)

## Basic Usage

```javascript
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM is ready!");
  // Safe to manipulate DOM here
  document.getElementById("myElement").textContent = "Hello";
});
```

## Alternative Syntax

```javascript
// Using arrow function
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is ready!");
});

// If script is at end of body, might already be loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", handler);
} else {
  handler(); // DOM already loaded
}
```

## ReadyState Values

```javascript
// Check current state
console.log(document.readyState);
// "loading" - document is still loading
// "interactive" - document has finished loading, DOM is ready
// "complete" - document and all resources have finished loading

// Listen to readyState changes
document.onreadystatechange = function() {
  if (document.readyState === "interactive") {
    console.log("DOM is ready (interactive)");
  }
  if (document.readyState === "complete") {
    console.log("All resources loaded (complete)");
  }
};
```

## DOMContentLoaded vs Load Event

```javascript
// DOMContentLoaded - fires when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready - can manipulate DOM");
});

// Load - fires when all resources are loaded
window.addEventListener("load", () => {
  console.log("All resources loaded - images, stylesheets, etc.");
});
```

### Event Sequence

```
1. HTML parsing starts
2. Deferred scripts execute
3. DOMContentLoaded fires ← DOM is ready
4. Images/stylesheets continue loading
5. Load event fires ← Everything loaded
```

## Stylesheets and DOMContentLoaded

```javascript
// Important notes:
// - DOMContentLoaded itself doesn't wait for stylesheets
// - However, deferred scripts DO wait for stylesheets
// - Regular scripts wait for already-parsed stylesheets

// Example:
// <link rel="stylesheet" href="styles.css">
// <script defer src="script.js"></script>
// 
// script.js will wait for styles.css to load
// DOMContentLoaded fires after script.js executes
```

## Practical Examples

### Safe DOM Manipulation

```javascript
document.addEventListener("DOMContentLoaded", () => {
  // Safe to query and manipulate DOM
  const button = document.getElementById("myButton");
  button.addEventListener("click", handleClick);
  
  const elements = document.querySelectorAll(".myClass");
  elements.forEach(el => el.classList.add("active"));
});
```

### Multiple Handlers

```javascript
// You can add multiple DOMContentLoaded listeners
document.addEventListener("DOMContentLoaded", () => {
  console.log("Handler 1");
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("Handler 2");
});
// Both will execute
```

### jQuery Equivalent

```javascript
// jQuery's $(document).ready() is similar
$(document).ready(function() {
  // jQuery code
});

// Or shorthand
$(function() {
  // jQuery code
});
```

## Common Use Cases

1. **DOM Manipulation**: Safely query and modify DOM elements
2. **Event Listeners**: Attach event handlers to elements
3. **Initialization**: Set up application state
4. **Third-party Scripts**: Initialize libraries that need DOM

```javascript
document.addEventListener("DOMContentLoaded", () => {
  // Initialize application
  initializeApp();
  
  // Set up event listeners
  setupEventListeners();
  
  // Load initial data
  loadInitialData();
});
```

## Best Practices

1. **Place scripts appropriately**: 
   - At end of `<body>` - DOMContentLoaded may fire before script runs
   - In `<head>` with `defer` - waits for DOM
   - Use DOMContentLoaded for scripts in `<head>`

2. **Check if already loaded**:
```javascript
function init() {
  // Your initialization code
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init(); // Already loaded
}
```

3. **Avoid blocking**: Keep DOMContentLoaded handlers lightweight

## Key Points
- Fires when HTML is parsed and DOM is ready
- Does NOT wait for images, stylesheets, or async scripts
- Preferred over `load` event for DOM manipulation
- Use when you need to access/modify DOM elements
- Multiple listeners can be attached
- Check `document.readyState` if script might run after DOM is ready

