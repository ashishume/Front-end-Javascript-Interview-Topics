# Debounce with Cancel in JavaScript

## Overview
Debounce with cancel is an enhanced version of the debounce pattern that allows you to cancel pending function executions. This is useful when you need to abort debounced operations, clean up pending operations, or reset the debounce timer programmatically.

## Basic Implementation

```javascript
// Debounce with cancel delayed invocations
function debounceWithCancel(func, delay) {
  let timeoutId;

  function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }

  debounced.cancel = function () {
    clearTimeout(timeoutId);
  };

  return debounced;
}
```

## Usage Example

```javascript
const debouncedSearch = debounceWithCancel((query) => {
  console.log('Searching for:', query);
  // Perform search
}, 300);

// User types
debouncedSearch('hello');
debouncedSearch('world');
debouncedSearch('javascript');

// Cancel before execution
debouncedSearch.cancel();
```

## Advanced Implementation

### With Immediate Option
```javascript
function debounceWithCancel(func, delay, immediate = false) {
  let timeoutId;
  let lastArgs;
  let lastThis;

  function debounced(...args) {
    lastArgs = args;
    lastThis = this;

    const callNow = immediate && !timeoutId;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        func.apply(lastThis, lastArgs);
      }
    }, delay);

    if (callNow) {
      func.apply(lastThis, lastArgs);
    }
  }

  debounced.cancel = function () {
    clearTimeout(timeoutId);
    timeoutId = null;
    lastArgs = null;
    lastThis = null;
  };

  debounced.flush = function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
      func.apply(lastThis, lastArgs);
    }
  };

  debounced.pending = function () {
    return timeoutId !== null;
  };

  return debounced;
}
```

## Complete Implementation with All Features

```javascript
function debounceAdvanced(func, delay, options = {}) {
  const {
    immediate = false,
    maxWait = null
  } = options;

  let timeoutId;
  let maxTimeoutId;
  let lastArgs;
  let lastThis;
  let lastCallTime;
  let result;

  function invokeFunc() {
    const args = lastArgs;
    const thisArg = lastThis;
    
    lastArgs = lastThis = null;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge() {
    // Reset any `maxWait` timer
    if (maxTimeoutId) {
      clearTimeout(maxTimeoutId);
      maxTimeoutId = null;
    }
    
    // Invoke the function
    return invokeFunc();
  }

  function remainingWait() {
    const timeSinceLastCall = Date.now() - lastCallTime;
    const timeWaiting = delay - timeSinceLastCall;
    return timeWaiting;
  }

  function shouldInvoke() {
    const timeSinceLastCall = Date.now() - lastCallTime;
    return lastCallTime === null || timeSinceLastCall >= delay;
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke()) {
      return trailingEdge();
    }
    // Restart the timer
    timeoutId = setTimeout(timerExpired, remainingWait());
  }

  function trailingEdge() {
    timeoutId = null;
    
    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once
    if (lastArgs) {
      return invokeFunc();
    }
    lastArgs = lastThis = null;
    return result;
  }

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (maxTimeoutId) {
      clearTimeout(maxTimeoutId);
    }
    lastCallTime = 0;
    lastArgs = lastThis = timeoutId = maxTimeoutId = null;
  }

  function flush() {
    return timeoutId === null ? result : trailingEdge();
  }

  function pending() {
    return timeoutId !== null;
  }

  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke();

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timeoutId === null) {
        return leadingEdge();
      }
      if (maxWait) {
        // Handle `maxWait`
        timeoutId = setTimeout(timerExpired, delay);
        return invokeFunc();
      }
    }
    if (timeoutId === null) {
      timeoutId = setTimeout(timerExpired, delay);
    }
    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;

  return debounced;
}
```

## Use Cases

### 1. Search Input with Cancel
```javascript
const searchInput = document.getElementById('search');
let debouncedSearch;

function performSearch(query) {
  console.log('Searching for:', query);
  // API call
  fetch(`/api/search?q=${query}`)
    .then(res => res.json())
    .then(data => displayResults(data));
}

debouncedSearch = debounceWithCancel(performSearch, 500);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// Cancel search when input is cleared
searchInput.addEventListener('focusout', () => {
  if (searchInput.value === '') {
    debouncedSearch.cancel();
  }
});
```

### 2. Auto-save with Cancel
```javascript
const saveButton = document.getElementById('save');
const cancelButton = document.getElementById('cancel');

const autoSave = debounceWithCancel((data) => {
  fetch('/api/save', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}, 2000);

// Auto-save on input
document.getElementById('editor').addEventListener('input', (e) => {
  autoSave(e.target.value);
});

// Cancel auto-save on manual save
saveButton.addEventListener('click', () => {
  autoSave.cancel();
  // Manual save
});

// Cancel on cancel button
cancelButton.addEventListener('click', () => {
  autoSave.cancel();
});
```

### 3. Resize Handler with Cancel
```javascript
const handleResize = debounceWithCancel(() => {
  console.log('Window resized');
  // Update layout
  updateLayout();
}, 250);

window.addEventListener('resize', handleResize);

// Cancel on page unload
window.addEventListener('beforeunload', () => {
  handleResize.cancel();
});
```

### 4. Form Validation with Cancel
```javascript
const validateForm = debounceWithCancel((formData) => {
  // Perform validation
  const errors = validate(formData);
  displayErrors(errors);
}, 300);

form.addEventListener('input', () => {
  validateForm(getFormData());
});

// Cancel validation on form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateForm.cancel();
  // Immediate validation
  const errors = validate(getFormData());
  if (errors.length === 0) {
    submitForm();
  }
});
```

## React Hook Example

```javascript
import { useEffect, useRef } from 'react';

function useDebounceWithCancel(callback, delay) {
  const timeoutRef = useRef(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debounced = useRef((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }).current;

  debounced.cancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, []);

  return debounced;
}

// Usage
function SearchComponent() {
  const [query, setQuery] = useState('');
  const debouncedSearch = useDebounceWithCancel((q) => {
    performSearch(q);
  }, 500);

  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleCancel = () => {
    debouncedSearch.cancel();
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}
```

## Class-Based Implementation

```javascript
class Debouncer {
  constructor(func, delay, options = {}) {
    this.func = func;
    this.delay = delay;
    this.immediate = options.immediate || false;
    this.timeoutId = null;
    this.lastArgs = null;
    this.lastThis = null;
  }

  debounce(...args) {
    this.lastArgs = args;
    this.lastThis = this;

    const callNow = this.immediate && !this.timeoutId;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.timeoutId = null;
      if (!this.immediate) {
        this.func.apply(this.lastThis, this.lastArgs);
      }
    }, this.delay);

    if (callNow) {
      this.func.apply(this.lastThis, this.lastArgs);
    }
  }

  cancel() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.lastArgs = null;
    this.lastThis = null;
  }

  flush() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      this.func.apply(this.lastThis, this.lastArgs);
    }
  }

  pending() {
    return this.timeoutId !== null;
  }
}
```

## Best Practices

1. **Always Cancel on Cleanup**: Cancel debounced functions in cleanup/unmount
2. **Handle Pending State**: Check if function is pending before canceling
3. **Memory Management**: Clear references when canceling
4. **Error Handling**: Handle errors in debounced functions
5. **Testing**: Test cancel functionality thoroughly

## Comparison with Regular Debounce

### Regular Debounce
```javascript
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
// No way to cancel
```

### Debounce with Cancel
```javascript
function debounceWithCancel(func, delay) {
  let timeoutId;
  function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  }
  debounced.cancel = () => clearTimeout(timeoutId);
  return debounced;
}
// Can cancel: debounced.cancel()
```

## Real-World Example

```javascript
class SearchManager {
  constructor() {
    this.searchFunction = debounceWithCancel(this.performSearch.bind(this), 500);
  }

  performSearch(query) {
    console.log('Searching:', query);
    // API call
  }

  handleInput(query) {
    this.searchFunction(query);
  }

  cancel() {
    this.searchFunction.cancel();
  }

  destroy() {
    this.cancel();
  }
}

// Usage
const searchManager = new SearchManager();
searchInput.addEventListener('input', (e) => {
  searchManager.handleInput(e.target.value);
});

// Cleanup
window.addEventListener('beforeunload', () => {
  searchManager.destroy();
});
```
