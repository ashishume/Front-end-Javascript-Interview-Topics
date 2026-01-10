# History API in JavaScript

## Overview
The History API provides access to the browser's session history, allowing you to manipulate the browser history and navigate programmatically without full page reloads. It's essential for building Single Page Applications (SPAs) and implementing client-side routing.

## Basic Syntax

```javascript
// Access history object
console.log(window.history);

// Navigate back
history.back();

// Navigate forward
history.forward();

// Navigate to specific position
history.go(-2); // Go back 2 pages
history.go(1);  // Go forward 1 page
```

## History Object Properties

```javascript
// Length of history stack
console.log(history.length);

// Current state
console.log(history.state);
```

## pushState Method

Adds a new entry to the history stack without reloading the page.

```javascript
// Syntax: history.pushState(state, title, url)

window.history.pushState(
  { name: "Ashish", page: "home" }, // State object
  "Home Page",                        // Title (often ignored by browsers)
  "/home"                             // URL (relative or absolute)
);

console.log(window.history.state); // { name: "Ashish", page: "home" }
```

### Example: SPA Navigation

```javascript
function navigateTo(path) {
  const state = { path, timestamp: Date.now() };
  history.pushState(state, "", path);
  renderPage(path);
}

// Usage
navigateTo("/about");
navigateTo("/contact");
```

## replaceState Method

Replaces the current history entry without adding a new one.

```javascript
// Syntax: history.replaceState(state, title, url)

history.replaceState(
  { page: "updated" },
  "Updated Page",
  "/updated"
);

// Current entry is replaced, back button won't go to previous URL
```

### Example: Updating Current State

```javascript
// Update current page state without adding history entry
function updateState(data) {
  const currentState = history.state || {};
  history.replaceState(
    { ...currentState, ...data },
    "",
    window.location.pathname
  );
}
```

## popstate Event

Fired when the user navigates through history (back/forward buttons).

```javascript
window.addEventListener("popstate", (event) => {
  console.log("State:", event.state);
  console.log("Location:", window.location);
  
  // Restore page based on state
  if (event.state) {
    renderPage(event.state.path);
  }
});
```

## Complete SPA Router Example

```javascript
class SimpleRouter {
  constructor() {
    this.routes = {};
    this.init();
  }
  
  init() {
    // Handle initial load
    window.addEventListener("load", () => {
      this.handleRoute(window.location.pathname);
    });
    
    // Handle browser back/forward
    window.addEventListener("popstate", (event) => {
      const path = event.state?.path || window.location.pathname;
      this.handleRoute(path);
    });
    
    // Handle link clicks
    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        const path = e.target.getAttribute("href");
        this.navigate(path);
      }
    });
  }
  
  route(path, handler) {
    this.routes[path] = handler;
  }
  
  navigate(path) {
    const state = { path, timestamp: Date.now() };
    history.pushState(state, "", path);
    this.handleRoute(path);
  }
  
  handleRoute(path) {
    const handler = this.routes[path];
    if (handler) {
      handler();
    } else {
      this.routes["/404"]?.() || console.error("Route not found");
    }
  }
}

// Usage
const router = new SimpleRouter();

router.route("/", () => {
  document.getElementById("content").innerHTML = "<h1>Home</h1>";
});

router.route("/about", () => {
  document.getElementById("content").innerHTML = "<h1>About</h1>";
});

router.route("/contact", () => {
  document.getElementById("content").innerHTML = "<h1>Contact</h1>";
});
```

## State Management

```javascript
// Store complex state
const appState = {
  user: { name: "John", id: 123 },
  filters: { category: "tech", sort: "date" },
  view: "list"
};

history.pushState(appState, "", "/dashboard");

// Retrieve state
window.addEventListener("popstate", (event) => {
  const state = event.state;
  if (state) {
    restoreAppState(state);
  }
});
```

## URL Parameters and Query Strings

```javascript
function navigateWithParams(path, params) {
  const url = new URL(path, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  
  history.pushState({ path, params }, "", url.pathname + url.search);
}

// Usage
navigateWithParams("/search", { q: "javascript", page: 1 });
```

## Scroll Restoration

```javascript
// Enable automatic scroll restoration
if ("scrollRestoration" in history) {
  history.scrollRestoration = "auto"; // or "manual"
}

// Manual scroll restoration
window.addEventListener("popstate", (event) => {
  if (event.state && event.state.scrollY !== undefined) {
    window.scrollTo(0, event.state.scrollY);
  }
});

// Save scroll position
window.addEventListener("scroll", () => {
  const state = history.state || {};
  history.replaceState(
    { ...state, scrollY: window.scrollY },
    "",
    window.location.pathname
  );
});
```

## Browser Compatibility

The History API is supported in:
- Chrome 5+
- Firefox 4+
- Safari 5+
- Edge 12+
- IE 10+

## Common Patterns

### 1. Breadcrumb Navigation

```javascript
const breadcrumbs = [];

function navigate(path, title) {
  breadcrumbs.push({ path, title });
  history.pushState({ path, breadcrumbs: [...breadcrumbs] }, title, path);
  updateBreadcrumbUI(breadcrumbs);
}
```

### 2. Modal State Management

```javascript
function openModal(modalId) {
  const state = history.state || {};
  history.pushState(
    { ...state, modal: modalId },
    "",
    `?modal=${modalId}`
  );
  showModal(modalId);
}

window.addEventListener("popstate", (event) => {
  if (event.state?.modal) {
    showModal(event.state.modal);
  } else {
    hideModal();
  }
});
```

### 3. Form State Preservation

```javascript
function saveFormState(formData) {
  history.replaceState(
    { formData },
    "",
    window.location.pathname
  );
}

window.addEventListener("popstate", (event) => {
  if (event.state?.formData) {
    restoreForm(event.state.formData);
  }
});
```

## Best Practices

1. **Always handle popstate**: Users expect back/forward buttons to work
2. **Store minimal state**: Don't store large objects in history state
3. **Use replaceState for updates**: When updating current page, use replaceState
4. **Handle initial load**: Check state on page load
5. **Validate state**: Always validate state data before using it
6. **Clean URLs**: Use clean, readable URLs

```javascript
// ✅ Good: Handle popstate
window.addEventListener("popstate", handleNavigation);

// ✅ Good: Minimal state
history.pushState({ id: 123 }, "", "/item/123");

// ❌ Bad: Large state object
history.pushState({ hugeData: /* ... */ }, "", "/page");

// ✅ Good: Validate state
window.addEventListener("popstate", (event) => {
  if (event.state && event.state.path) {
    navigate(event.state.path);
  }
});
```

## Limitations

1. **Same-origin restriction**: Can only modify URLs on the same origin
2. **State size limit**: State objects should be relatively small
3. **Title parameter**: Often ignored by browsers
4. **No hash support**: pushState doesn't work with hash fragments

## Summary

The History API enables building SPAs with proper browser navigation support. It allows programmatic navigation, state management, and proper handling of browser back/forward buttons, making it essential for modern web applications.

