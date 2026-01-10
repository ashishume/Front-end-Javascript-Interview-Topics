# Tree Shaking in JavaScript

## Overview
Tree shaking is a process used in modern JavaScript bundlers to eliminate dead code before adding it to the final bundle. It analyzes the dependency graph of your code, identifies unused exports, and removes them to reduce the final bundle size.

## How It Works

1. **Analyzes the dependency graph**: Traces all imports and exports
2. **Identifies unused exports**: Finds code that's imported but never used
3. **Removes dead code**: Eliminates unused code from the final bundle
4. **Reduces bundle size**: Results in smaller, more efficient bundles

## Basic Example

```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => a / b;

// main.js
import { add } from "./math.js";
console.log(add(2, 3));
```

In this example, the `subtract`, `multiply`, and `divide` functions would be removed during tree shaking as they're not used.

## Requirements for Tree Shaking

### 1. ES6 Module Syntax

Tree shaking requires ES6 module syntax (`import`/`export`):

```javascript
// ✅ Good: ES6 modules (tree-shakeable)
export const add = (a, b) => a + b;
import { add } from "./math.js";

// ❌ Bad: CommonJS (not tree-shakeable)
module.exports = { add };
const { add } = require("./math.js");
```

### 2. Static Analysis

Bundlers need to statically analyze your code:

```javascript
// ✅ Good: Static import
import { add } from "./math.js";

// ❌ Bad: Dynamic import (harder to tree-shake)
const module = await import("./math.js");
```

### 3. Side-Effect Free Modules

Modules should be free of side effects:

```javascript
// ✅ Good: Pure module
export const add = (a, b) => a + b;

// ❌ Bad: Side effects prevent tree shaking
export const add = (a, b) => a + b;
window.myGlobal = "value"; // Side effect!
```

## Benefits

### 1. Smaller Bundle Size

```javascript
// Before tree shaking: 50KB
// After tree shaking: 15KB
// Savings: 70% reduction
```

### 2. Improved Load Times

Smaller bundles mean faster downloads and parsing:

```
Bundle Size: 200KB → 80KB
Load Time: 2.5s → 1.0s
```

### 3. Better Performance

Less code to parse and execute:

- Faster initial load
- Reduced memory usage
- Better runtime performance

## Common Bundlers

### Webpack

```javascript
// webpack.config.js
module.exports = {
  mode: "production", // Enables tree shaking
  optimization: {
    usedExports: true,
    sideEffects: false
  }
};
```

### Rollup

```javascript
// rollup.config.js
export default {
  input: "src/main.js",
  output: {
    file: "bundle.js",
    format: "es"
  },
  treeshake: {
    moduleSideEffects: false
  }
};
```

### Parcel

Parcel automatically performs tree shaking in production mode.

### Vite

Vite uses Rollup for production builds, which includes tree shaking by default.

## Best Practices

### 1. Use ES6 Module Syntax

```javascript
// ✅ Good
export const utility = () => {};
import { utility } from "./utils.js";

// ❌ Bad
module.exports = { utility };
const { utility } = require("./utils.js");
```

### 2. Avoid Side Effects

```javascript
// ✅ Good: Pure module
export const add = (a, b) => a + b;

// ❌ Bad: Side effects
export const add = (a, b) => a + b;
console.log("Module loaded"); // Side effect
```

### 3. Mark Side-Effect Modules

If a module has side effects, mark it in `package.json`:

```json
{
  "name": "my-package",
  "sideEffects": ["./src/polyfills.js", "*.css"]
}
```

### 4. Use Named Exports

```javascript
// ✅ Good: Named exports (better for tree shaking)
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// ⚠️ Less optimal: Default export
export default { add, subtract };
```

### 5. Avoid Barrel Exports When Possible

```javascript
// ⚠️ Can prevent tree shaking
// utils/index.js
export * from "./math.js";
export * from "./string.js";

// ✅ Better: Direct imports
import { add } from "./utils/math.js";
```

## Real-World Example

### Before Tree Shaking

```javascript
// utils.js
export const formatDate = (date) => { /* ... */ };
export const formatCurrency = (amount) => { /* ... */ };
export const formatPhone = (phone) => { /* ... */ };
export const validateEmail = (email) => { /* ... */ };

// main.js
import { formatDate } from "./utils.js";
// All functions included in bundle: 15KB
```

### After Tree Shaking

```javascript
// Only formatDate included: 3KB
// Savings: 12KB (80% reduction)
```

## Library Development

### 1. Package.json Configuration

```json
{
  "name": "my-library",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "sideEffects": false
}
```

### 2. ESM Build

```javascript
// Provide ES module build for better tree shaking
// dist/index.esm.js
export { add } from "./math.js";
export { format } from "./string.js";
```

### 3. Avoid Default Exports for Utilities

```javascript
// ✅ Good: Named exports
export const add = (a, b) => a + b;

// ❌ Bad: Default export object
export default {
  add: (a, b) => a + b
};
```

## Debugging Tree Shaking

### 1. Webpack Bundle Analyzer

```bash
npm install --save-dev webpack-bundle-analyzer
```

```javascript
// webpack.config.js
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  plugins: [new BundleAnalyzerPlugin()]
};
```

### 2. Check Bundle Contents

```bash
# Analyze bundle
npm run build -- --analyze

# Check what's included
grep -r "unusedFunction" dist/
```

### 3. Verify Tree Shaking

```javascript
// Add unused import
import { unusedFunction } from "./utils.js";

// Build and check if it's removed
// If it's still in bundle, tree shaking isn't working
```

## Common Issues

### 1. Babel Transpilation

Babel might convert ES6 modules to CommonJS:

```javascript
// .babelrc
{
  "presets": [
    ["@babel/preset-env", {
      "modules": false // Keep ES6 modules
    }]
  ]
}
```

### 2. TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "ESNext", // Use ES modules
    "moduleResolution": "node"
  }
}
```

### 3. Third-Party Libraries

Some libraries don't support tree shaking:

```javascript
// ❌ Bad: Imports entire library
import _ from "lodash";
_.add(1, 2);

// ✅ Good: Import specific functions
import add from "lodash/add";
add(1, 2);
```

## Performance Metrics

### Example Bundle Sizes

```
Without Tree Shaking:
- main.js: 250KB
- vendor.js: 180KB
- Total: 430KB

With Tree Shaking:
- main.js: 85KB
- vendor.js: 120KB
- Total: 205KB

Reduction: 52% smaller
```

## Summary

Tree shaking is an essential optimization technique that eliminates unused code from bundles. It requires ES6 module syntax, static analysis capabilities, and side-effect-free modules. Proper use of tree shaking can significantly reduce bundle sizes, improving load times and performance. Modern bundlers like Webpack, Rollup, and Vite support tree shaking out of the box when configured correctly.

