# Throttler with Multiple Button Clicks

## Overview
Throttling multiple button clicks ensures that a function is executed at most once within a specified time period, regardless of how many times the button is clicked. This prevents rapid-fire clicks from triggering excessive function calls.

## Basic Implementation

```javascript
/** Button click function throttler */

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Example usage:
const handleClick = () => {
  console.log("Button clicked!");
};

const throttledHandleClick = throttle(handleClick, 2000);

document
  .getElementById("myButton")
  .addEventListener("click", throttledHandleClick);
```

## Enhanced Implementation

### Leading and Trailing Options
```javascript
function throttle(func, limit, options = {}) {
  const { leading = true, trailing = false } = options;
  let timeoutId;
  let lastExecTime = 0;
  let lastArgs;
  let lastContext;
  
  return function(...args) {
    const now = Date.now();
    lastArgs = args;
    lastContext = this;
    
    if (leading && now - lastExecTime >= limit) {
      func.apply(this, args);
      lastExecTime = now;
    } else if (trailing) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(lastContext, lastArgs);
        lastExecTime = Date.now();
      }, limit - (now - lastExecTime));
    }
  };
}
```

## Use Cases

### 1. API Calls
```javascript
const handleSubmit = throttle(() => {
  fetch('/api/submit', { method: 'POST' });
}, 2000);
```

### 2. Scroll Events
```javascript
const handleScroll = throttle(() => {
  updateScrollPosition();
}, 100);
```

## Best Practices

1. **Set Appropriate Limits**: Balance responsiveness and rate limiting
2. **Handle Arguments**: Preserve function arguments
3. **Maintain Context**: Preserve `this` context
4. **Provide Options**: Leading/trailing options
5. **Clean Up**: Clear timeouts when needed
