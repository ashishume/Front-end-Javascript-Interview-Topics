# Tree Shaking

## Overview

Tree shaking is a process used in modern JavaScript bundlers to eliminate dead code before adding it to the final bundle.

## How It Works

- Analyzes the dependency graph of your code
- Identifies and removes unused exports
- Reduces the final bundle size

## Benefits

- Smaller bundle size
- Improved load times
- Better performance

## Example

```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import { add } from "./math.js";
console.log(add(2, 3));
```

In this example, the `subtract` function would be removed during tree shaking as it's not used.

## Best Practices

- Use ES6 module syntax (import/export)
- Avoid side effects in modules
- Configure your bundler correctly

## Common Bundlers

- Webpack
- Rollup
- Parcel
- Vite
