# Shadow DOM in JavaScript

## Overview
Shadow DOM allows hidden DOM trees to be attached to elements in the regular DOM tree. This shadow DOM tree starts with a shadow root, underneath which you can attach any element, in the same way as the normal DOM. Shadow DOM provides encapsulation for styles and markup, enabling component isolation.

## Basic Syntax

```javascript
const hostElement = document.getElementById("host-element");

// Create a shadow root and attach it to the host element
const shadowRoot = hostElement.attachShadow({ mode: "open" });

// Create elements inside the shadow root
const shadowElement = document.createElement("div");
shadowElement.textContent = "This is inside the Shadow DOM!";

// Append to shadow root
shadowRoot.appendChild(shadowElement);
```

## Shadow Root Modes

### Open Mode

The Shadow DOM is accessible from the outside via the `shadowRoot` property.

```javascript
const shadowRoot = hostElement.attachShadow({ mode: "open" });

// Can access from outside
console.log(hostElement.shadowRoot); // Returns shadow root
```

### Closed Mode

The Shadow DOM is not accessible from outside. Accessing `shadowRoot` returns `null`.

```javascript
const shadowRoot = hostElement.attachShadow({ mode: "closed" });

// Cannot access from outside
console.log(hostElement.shadowRoot); // Returns null
```

## Basic Example

```javascript
const hostElement = document.getElementById("host-element");

// Create shadow root
const shadowRoot = hostElement.attachShadow({ mode: "open" });

// Create element inside shadow root
const shadowElement = document.createElement("div");
shadowElement.setAttribute("class", "random");
shadowElement.textContent = "This is inside the Shadow DOM!";

// Note: CSS attached to .random class won't affect shadow DOM
// Styles are encapsulated

// Append to shadow root
shadowRoot.appendChild(shadowElement);
```

## Style Encapsulation

### Styles Don't Leak Out

```html
<!-- Regular DOM -->
<style>
  .shadow-content {
    color: red;
  }
</style>

<div id="host"></div>
```

```javascript
const host = document.getElementById("host");
const shadowRoot = host.attachShadow({ mode: "open" });

shadowRoot.innerHTML = `
  <style>
    .shadow-content {
      color: blue; /* Only affects shadow DOM */
    }
  </style>
  <div class="shadow-content">Shadow content</div>
`;

// Regular DOM styles don't affect shadow DOM
// Shadow DOM styles don't affect regular DOM
```

### Styles Don't Leak In

```html
<style>
  .global-style {
    font-size: 20px;
  }
</style>

<div id="host"></div>
```

```javascript
const shadowRoot = host.attachShadow({ mode: "open" });
shadowRoot.innerHTML = `
  <div class="global-style">
    This won't get the global style
  </div>
`;
```

## Creating Web Components with Shadow DOM

```javascript
class CustomCard extends HTMLElement {
  constructor() {
    super();
    
    // Create shadow root
    const shadowRoot = this.attachShadow({ mode: "open" });
    
    // Define template
    shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin: 10px;
        }
        
        .card-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        
        .card-content {
          color: #666;
        }
      </style>
      <div class="card-title">
        <slot name="title">Default Title</slot>
      </div>
      <div class="card-content">
        <slot name="content">Default Content</slot>
      </div>
    `;
  }
}

// Register custom element
customElements.define("custom-card", CustomCard);
```

```html
<!-- Usage -->
<custom-card>
  <span slot="title">My Card Title</span>
  <span slot="content">My card content goes here</span>
</custom-card>
```

## Slots

Slots allow you to project content from the light DOM into the shadow DOM.

### Basic Slot

```javascript
shadowRoot.innerHTML = `
  <div>
    <slot></slot>
  </div>
`;

// Usage
<custom-element>This content goes into the slot</custom-element>
```

### Named Slots

```javascript
shadowRoot.innerHTML = `
  <div>
    <slot name="header"></slot>
    <slot name="body"></slot>
    <slot name="footer"></slot>
  </div>
`;
```

```html
<custom-element>
  <div slot="header">Header content</div>
  <div slot="body">Body content</div>
  <div slot="footer">Footer content</div>
</custom-element>
```

### Default Slot Content

```javascript
shadowRoot.innerHTML = `
  <div>
    <slot>
      <p>Default content if no slot content provided</p>
    </slot>
  </div>
`;
```

## :host Selector

The `:host` selector styles the host element from within the shadow DOM.

```javascript
shadowRoot.innerHTML = `
  <style>
    :host {
      display: block;
      padding: 20px;
      background: white;
    }
    
    :host(:hover) {
      background: #f0f0f0;
    }
    
    :host(.active) {
      border: 2px solid blue;
    }
  </style>
  <div>Content</div>
`;
```

## :host-context() Selector

Styles the host element based on its parent.

```javascript
shadowRoot.innerHTML = `
  <style>
    :host-context(.dark-theme) {
      background: #333;
      color: white;
    }
  </style>
`;
```

```html
<div class="dark-theme">
  <custom-element>Styled by parent</custom-element>
</div>
```

## Accessing Shadow DOM

### Open Mode

```javascript
const shadowRoot = element.attachShadow({ mode: "open" });
const shadowElement = shadowRoot.querySelector(".content");
```

### Closed Mode

```javascript
class CustomElement extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });
  }
  
  getShadowRoot() {
    return this._shadowRoot; // Only accessible internally
  }
}
```

## Event Handling

Events in shadow DOM bubble up to the host element.

```javascript
shadowRoot.innerHTML = `
  <button id="shadow-button">Click me</button>
`;

shadowRoot.querySelector("#shadow-button").addEventListener("click", (e) => {
  console.log("Button clicked in shadow DOM");
  // Event bubbles to host element
});

// Listen on host
hostElement.addEventListener("click", (e) => {
  console.log("Event reached host");
});
```

### Event Retargeting

Events are retargeted to appear as if they came from the host element.

```javascript
shadowRoot.querySelector("button").addEventListener("click", (e) => {
  console.log(e.target); // Shows host element, not button
  console.log(e.composedPath()); // Shows actual path including shadow DOM
});
```

## Composed Events

Events can cross shadow DOM boundaries.

```javascript
// Create a composed event
const event = new CustomEvent("custom-event", {
  bubbles: true,
  composed: true // Can cross shadow DOM boundary
});

shadowRoot.querySelector("button").dispatchEvent(event);
```

## Styling from Outside

### CSS Custom Properties

```javascript
// Shadow DOM
shadowRoot.innerHTML = `
  <style>
    .content {
      color: var(--text-color, black);
      background: var(--bg-color, white);
    }
  </style>
  <div class="content">Content</div>
`;
```

```css
/* Outside stylesheet */
custom-element {
  --text-color: blue;
  --bg-color: #f0f0f0;
}
```

### ::part() Pseudo-element

```javascript
shadowRoot.innerHTML = `
  <div part="content">Content</div>
`;
```

```css
custom-element::part(content) {
  color: red;
}
```

## Multiple Shadow Roots

A single element can have only one shadow root. Attaching a second will throw an error.

```javascript
// ❌ Error: Shadow root already attached
element.attachShadow({ mode: "open" });
element.attachShadow({ mode: "open" }); // Error!
```

## Use Cases

### 1. Component Encapsulation

```javascript
class EncapsulatedComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
      <style>
        /* Styles are encapsulated */
        .internal { color: blue; }
      </style>
      <div class="internal">Encapsulated content</div>
    `;
  }
}
```

### 2. Third-Party Widgets

```javascript
// Embed third-party widget without style conflicts
const widget = document.createElement("div");
const shadowRoot = widget.attachShadow({ mode: "open" });
shadowRoot.innerHTML = thirdPartyWidgetHTML;
```

### 3. Style Isolation

```javascript
// Isolate component styles
class StyledComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
      <style>
        /* These styles won't affect other elements */
        h1 { color: red; }
        p { margin: 10px; }
      </style>
      <h1>Title</h1>
      <p>Content</p>
    `;
  }
}
```

## Browser Support

Shadow DOM is supported in:
- Chrome 53+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## Best Practices

1. **Use open mode for flexibility**: Closed mode provides security but limits debugging
2. **Use slots for content projection**: Don't manipulate light DOM directly
3. **Use CSS custom properties**: For theming from outside
4. **Minimize shadow DOM depth**: Keep structure simple
5. **Use :host for host styling**: Don't style host from outside when possible

```javascript
// ✅ Good: Use slots
shadowRoot.innerHTML = `<slot></slot>`;

// ❌ Bad: Manipulate light DOM
this.appendChild(element);
```

## Limitations

1. **One shadow root per element**: Cannot attach multiple shadow roots
2. **Style isolation**: Can make global styling difficult
3. **Event retargeting**: Can be confusing for event handling
4. **Browser support**: Older browsers need polyfills

## Summary

Shadow DOM provides encapsulation for styles and markup, enabling component isolation. It's essential for building web components and preventing style conflicts. Use shadow DOM when you need style isolation, component encapsulation, or when building reusable components. Understanding slots, :host selector, and event handling is crucial for effective use of Shadow DOM.

