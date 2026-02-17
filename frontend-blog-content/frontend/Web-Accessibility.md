# Web Accessibility in JavaScript

## Overview
Accessibility means creating websites and applications that everyone can use, regardless of their abilities or disabilities. It ensures that web content is perceivable, operable, understandable, and robust for all users, including those using assistive technologies.

## Why Do We Need It?

- Ensures that people with disabilities can access and use web content
- Improves the overall user experience for everyone
- Many accessibility practices also benefit search engine optimization
- Legal compliance (ADA, WCAG guidelines)
- Increases potential user base

## Tabindex Attribute

The `tabindex` attribute controls the order and focusability of elements when navigating through a webpage using the keyboard.

```html
<!-- tabindex="0" means natural tab order -->
<button tabindex="0">Button 1</button>

<!-- tabindex="positive number" - goes in order -->
<button tabindex="1">Button 2</button>
<button tabindex="2">Button 3</button>

<!-- tabindex="-1" - Makes the element focusable only programmatically -->
<div tabindex="-1" id="modal">Modal Content</div>
```

## Areas of Accessibility

### 1. Semantic HTML Tags
```html
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>Article Title</h1>
    <p>Content</p>
  </article>
</main>
<footer>Footer content</footer>
```

### 2. Alt Text for Images
```html
<img src="image.jpg" alt="A beautiful scenery of mountains and a lake">
```

### 3. Keyboard Navigation
```html
<!-- Ensure all interactive elements are accessible via keyboard -->
<a href="https://example.com" role="button">Link Styled as Button</a>
```

### 4. Form Labels
```html
<label for="name">Name:</label>
<input type="text" id="name" name="name">
```

### 5. Contrast and Color
Ensure sufficient contrast between text and background colors (WCAG AA: 4.5:1 for normal text, 3:1 for large text).

### 6. ARIA Labels
```html
<button aria-label="Submit Form">Click Me</button>
```

## ARIA (Accessible Rich Internet Applications)

ARIA provides a way to make web applications more accessible to people with disabilities by defining a way to make dynamic content more accessible.

### Common ARIA Attributes

```html
<!-- Roles -->
<div role="button" tabindex="0">Custom Button</div>
<div role="alert">Error message</div>

<!-- States and Properties -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<div id="menu" aria-hidden="true">Menu content</div>

<!-- Labels -->
<input type="text" aria-label="Search" aria-required="true">
```

## Assistive Technologies

- **Screen readers**: Read content aloud (NVDA, JAWS, VoiceOver)
- **Screen magnifiers**: Enlarge content for vision impairments
- **Speech recognition**: Voice input for navigation
- **Alternate input devices**: Switch controls, eye tracking

## JavaScript Accessibility Best Practices

### 1. Keyboard Event Handling
```javascript
element.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    handleClick();
  }
});
```

### 2. Focus Management
```javascript
function openModal() {
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  modal.querySelector("button").focus();
}

function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  triggerButton.focus(); // Return focus to trigger
}
```

### 3. ARIA Live Regions
```javascript
const liveRegion = document.createElement("div");
liveRegion.setAttribute("role", "status");
liveRegion.setAttribute("aria-live", "polite");
liveRegion.setAttribute("aria-atomic", "true");
document.body.appendChild(liveRegion);

function announce(message) {
  liveRegion.textContent = message;
}
```

### 4. Skip Links
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

## Testing Accessibility

### Automated Testing
```javascript
// Using axe-core
import axe from 'axe-core';

axe.run(document, (err, results) => {
  if (err) throw err;
  console.log(results.violations);
});
```

### Manual Testing
- Test with keyboard only
- Test with screen reader
- Check color contrast
- Verify focus indicators

## Common Accessibility Patterns

### Accessible Modal
```javascript
class AccessibleModal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.trigger = null;
    this.focusableElements = null;
  }
  
  open(triggerElement) {
    this.trigger = triggerElement;
    this.modal.style.display = "block";
    this.modal.setAttribute("aria-hidden", "false");
    this.trapFocus();
    this.focusableElements[0].focus();
  }
  
  close() {
    this.modal.style.display = "none";
    this.modal.setAttribute("aria-hidden", "true");
    if (this.trigger) {
      this.trigger.focus();
    }
  }
  
  trapFocus() {
    this.focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];
    
    this.modal.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
      if (e.key === "Escape") {
        this.close();
      }
    });
  }
}
```

## WCAG Guidelines

### Level A (Minimum)
- Basic accessibility requirements

### Level AA (Recommended)
- 4.5:1 contrast ratio for text
- Keyboard accessible
- No content that flashes more than 3 times per second

### Level AAA (Enhanced)
- 7:1 contrast ratio for text
- Sign language interpretation
- Extended audio descriptions

## Best Practices

1. **Use Semantic HTML**: Prefer native elements
2. **Provide Alt Text**: For all images
3. **Ensure Keyboard Access**: All functionality via keyboard
4. **Maintain Focus Order**: Logical tab order
5. **Provide Feedback**: Announce changes to screen readers
6. **Test Regularly**: Use automated and manual testing
7. **Follow WCAG**: Adhere to accessibility guidelines
