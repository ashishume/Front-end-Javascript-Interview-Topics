# ES6 Modules in JavaScript

## Overview
ES6 Modules (ECMAScript 2015) provide a standardized way to organize and share code across JavaScript files. They enable better code organization, dependency management, and support for static analysis and tree shaking.

## Basic Syntax

### Export

```javascript
// Named exports
export const name = "JavaScript";
export function greet() {
  return "Hello!";
}
export class User {
  constructor(name) {
    this.name = name;
  }
}

// Default export
export default function main() {
  return "Main function";
}
```

### Import

```javascript
// Named imports
import { name, greet, User } from "./module.js";

// Default import
import main from "./module.js";

// Import all as namespace
import * as module from "./module.js";

// Mixed imports
import main, { name, greet } from "./module.js";
```

## Export Patterns

### 1. Named Exports

```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;

// Import
import { add, subtract } from "./math.js";
```

### 2. Default Export

```javascript
// user.js
class User {
  constructor(name) {
    this.name = name;
  }
}

export default User;

// Import
import User from "./user.js";
```

### 3. Mixed Exports

```javascript
// utils.js
export const PI = 3.14159;
export function calculateArea(radius) {
  return PI * radius * radius;
}

export default function formatNumber(num) {
  return num.toFixed(2);
}

// Import
import formatNumber, { PI, calculateArea } from "./utils.js";
```

### 4. Re-exporting

```javascript
// index.js - Re-export from multiple modules
export { add, subtract } from "./math.js";
export { User } from "./user.js";
export { default as Calculator } from "./calculator.js";
```

## Import Patterns

### 1. Named Imports

```javascript
// Import specific named exports
import { someMessage, User } from "./otherModule.js";
```

### 2. Namespace Import

```javascript
// Import all exports as a namespace object
import * as other from "./otherModule.js";

console.log(other.User("Ashish"));
console.log(other.someMessage);
```

### 3. Default Import

```javascript
// Import default export
import Calculator from "./calculator.js";
```

### 4. Renaming Imports

```javascript
// Rename during import
import { User as Person } from "./user.js";
import { add as sum } from "./math.js";
```

### 5. Side-effect Only Import

```javascript
// Import module for side effects only
import "./polyfills.js";
import "./analytics.js";
```

## Module Features

### 1. Static Analysis

```javascript
// Modules are statically analyzable
// This allows bundlers to optimize and tree-shake unused code
import { add } from "./math.js";
// subtract is not imported, so it can be removed in production
```

### 2. Strict Mode

```javascript
// All modules run in strict mode by default
// No need for "use strict"
export function example() {
  // Automatically in strict mode
  undeclaredVar = "error"; // ReferenceError
}
```

### 3. Top-Level Scope

```javascript
// Each module has its own top-level scope
// Variables are not automatically global

const moduleVar = "local"; // Not global

export function getVar() {
  return moduleVar;
}
```

### 4. Hoisting

```javascript
// Import statements are hoisted
console.log(value); // Works even though import is below

import { value } from "./module.js";
```

## Dynamic Imports

```javascript
// Dynamic import returns a Promise
async function loadModule() {
  const module = await import("./module.js");
  module.doSomething();
}

// Conditional loading
if (condition) {
  import("./featureA.js").then((module) => {
    module.init();
  });
}

// With async/await
async function loadFeature() {
  const { default: Feature } = await import("./feature.js");
  return new Feature();
}
```

## Common Patterns

### 1. Barrel Exports (Index Files)

```javascript
// utils/index.js
export { add, subtract } from "./math.js";
export { format, parse } from "./string.js";
export { validate, sanitize } from "./validation.js";

// Usage
import { add, format, validate } from "./utils/index.js";
```

### 2. Default Export with Named Exports

```javascript
// component.js
function Component() {
  // Component logic
}

Component.propTypes = {};
Component.defaultProps = {};

export default Component;
export { Component }; // Also available as named export
```

### 3. Module Configuration

```javascript
// config.js
const config = {
  apiUrl: process.env.API_URL,
  timeout: 5000
};

export default config;
export const API_URL = config.apiUrl;
```

## Module vs Script

| Feature | Script | Module |
|---------|--------|--------|
| Scope | Global | Module |
| Strict Mode | Optional | Always |
| Top-level `this` | `window` | `undefined` |
| `await` at top-level | No | Yes |
| Static imports | No | Yes |

## Browser Usage

```html
<!-- Regular script -->
<script src="app.js"></script>

<!-- Module script -->
<script type="module" src="app.js"></script>

<!-- Inline module -->
<script type="module">
  import { add } from "./math.js";
  console.log(add(2, 3));
</script>
```

## Node.js Usage

```javascript
// package.json
{
  "type": "module"
}

// Or use .mjs extension
// app.mjs
import { add } from "./math.mjs";
```

## Circular Dependencies

```javascript
// a.js
import { b } from "./b.js";
export const a = "a";

// b.js
import { a } from "./a.js";
export const b = "b";

// Circular dependencies work but can be problematic
// Best to avoid them
```

## Best Practices

1. **Use named exports for utilities**: Better for tree shaking
2. **Use default exports for main entities**: Classes, components, main functions
3. **Avoid circular dependencies**: Can cause unexpected behavior
4. **Use index files for clean imports**: Barrel exports pattern
5. **Keep modules focused**: Single responsibility principle
6. **Use dynamic imports for code splitting**: Load code on demand

```javascript
// ✅ Good: Named exports for utilities
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// ✅ Good: Default export for main entity
export default class Calculator {
  // ...
}

// ✅ Good: Dynamic import for code splitting
const loadFeature = async () => {
  const module = await import("./feature.js");
  return module;
};
```

## Tree Shaking

```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;

// main.js
import { add } from "./math.js";
// subtract and multiply can be removed by bundler
```

## Summary

ES6 Modules provide a modern, standardized way to organize JavaScript code. They enable better code organization, static analysis, tree shaking, and dependency management. Understanding modules is essential for modern JavaScript development.

