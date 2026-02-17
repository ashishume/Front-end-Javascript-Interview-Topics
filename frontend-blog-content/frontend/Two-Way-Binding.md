# Two-Way Binding in JavaScript

## Overview
Two-way binding is a pattern where data flows in both directions: from the model to the view (data binding) and from the view to the model (event binding). When the model changes, the view updates automatically, and when the view changes (user input), the model updates automatically.

## Basic Implementation

Two-way binding can be implemented using JavaScript's `Object.defineProperty()` to create getters and setters that automatically update the DOM when data changes.

```javascript
const data = {
  value: "", // value where actual value is stored
};

// "prop" property will be used for both getter and setter
Object.defineProperty(data, "prop", {
  get: function () {
    return this.value; // value property is returned
  },
  set: function (value) {
    this.value = value; // value property is stored
    printVal(); // Update view when data changes
  },
});

const input = document.querySelector("#input-field");
input.addEventListener("keyup", (e) => {
  // "data.prop" is used to store the value
  data.prop = e.target.value;
});

function printVal() {
  const el = document.querySelector("#show-value");
  // "data.prop" is used to receive the value
  el.textContent = data.prop;
}
```

## How It Works

1. **Data to View**: When `data.prop` is set, the setter automatically updates the view
2. **View to Data**: When user types in input, the event listener updates `data.prop`
3. **Automatic Sync**: Both directions are automatically synchronized

## Complete Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>Two-Way Binding</title>
</head>
<body>
  <input id="input-field" type="text" placeholder="Type something...">
  <div id="show-value"></div>

  <script>
    const data = {
      value: "",
    };

    Object.defineProperty(data, "prop", {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.value = value;
        updateView();
      },
    });

    const input = document.querySelector("#input-field");
    input.addEventListener("keyup", (e) => {
      data.prop = e.target.value;
    });

    function updateView() {
      const el = document.querySelector("#show-value");
      el.textContent = data.prop;
    }
  </script>
</body>
</html>
```

## Using Proxy for Modern Implementation

ES6 Proxy provides a cleaner way to implement two-way binding:

```javascript
const data = new Proxy({ value: "" }, {
  set(target, property, value) {
    target[property] = value;
    updateView();
    return true;
  },
  get(target, property) {
    return target[property];
  }
});

const input = document.querySelector("#input-field");
input.addEventListener("input", (e) => {
  data.value = e.target.value;
});

function updateView() {
  document.querySelector("#show-value").textContent = data.value;
}
```

## Multiple Bindings

```javascript
class TwoWayBinding {
  constructor() {
    this.data = {};
    this.elements = new Map();
  }
  
  bind(property, elementId) {
    const element = document.getElementById(elementId);
    
    // Initialize data property
    if (!(property in this.data)) {
      this.data[property] = "";
    }
    
    // Store element reference
    this.elements.set(property, element);
    
    // View to Model: Update data when element changes
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.addEventListener('input', (e) => {
        this.data[property] = e.target.value;
        this.updateAll(property);
      });
    }
    
    // Model to View: Update element when data changes
    Object.defineProperty(this.data, property, {
      get: () => this.data[`_${property}`],
      set: (value) => {
        this.data[`_${property}`] = value;
        this.updateView(property);
      }
    });
    
    // Initial sync
    this.updateView(property);
  }
  
  updateView(property) {
    const element = this.elements.get(property);
    if (element) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.value = this.data[property];
      } else {
        element.textContent = this.data[property];
      }
    }
  }
  
  updateAll(changedProperty) {
    // Update all bound elements when one changes
    this.elements.forEach((element, property) => {
      if (property !== changedProperty) {
        this.updateView(property);
      }
    });
  }
}

// Usage
const binding = new TwoWayBinding();
binding.bind('name', 'name-input');
binding.bind('name', 'name-display');

// Update programmatically
binding.data.name = 'John Doe'; // Both elements update
```

## React-Style Two-Way Binding

```javascript
function createTwoWayBinding(initialValue = '') {
  const state = { value: initialValue };
  const listeners = new Set();
  
  const binding = {
    get value() {
      return state.value;
    },
    set value(newValue) {
      state.value = newValue;
      listeners.forEach(listener => listener(newValue));
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
  
  return binding;
}

// Usage
const nameBinding = createTwoWayBinding('');

// Subscribe to changes
nameBinding.subscribe(value => {
  document.getElementById('display').textContent = value;
});

// Update from input
document.getElementById('input').addEventListener('input', (e) => {
  nameBinding.value = e.target.value;
});

// Update programmatically
nameBinding.value = 'New Value';
```

## Advanced: Computed Properties

```javascript
class ReactiveData {
  constructor() {
    this._data = {};
    this._computed = {};
    this._dependencies = new Map();
  }
  
  defineProperty(key, initialValue) {
    const self = this;
    const dependencies = new Set();
    
    Object.defineProperty(this._data, key, {
      get() {
        // Track dependencies
        if (self._currentComputed) {
          dependencies.add(self._currentComputed);
        }
        return self._data[`_${key}`];
      },
      set(value) {
        self._data[`_${key}`] = value;
        // Notify dependents
        dependencies.forEach(dep => dep.update());
      }
    });
    
    this._data[`_${key}`] = initialValue;
  }
  
  computed(key, fn) {
    this._currentComputed = { key, fn, update: null };
    const value = fn();
    this._computed[key] = value;
    this._currentComputed = null;
    
    // Create reactive computed property
    Object.defineProperty(this, key, {
      get() {
        this._currentComputed = { key, fn, update: null };
        const newValue = fn();
        this._currentComputed = null;
        return newValue;
      }
    });
  }
  
  get data() {
    return this._data;
  }
}

// Usage
const reactive = new ReactiveData();
reactive.defineProperty('firstName', 'John');
reactive.defineProperty('lastName', 'Doe');

reactive.computed('fullName', () => {
  return `${reactive.data.firstName} ${reactive.data.lastName}`;
});

console.log(reactive.fullName); // "John Doe"
reactive.data.firstName = 'Jane';
console.log(reactive.fullName); // "Jane Doe"
```

## Use Cases

1. **Form Inputs**: Automatically sync input values with display
2. **Search Filters**: Update results as user types
3. **Real-time Updates**: Keep multiple views in sync
4. **Data Validation**: Show validation messages immediately
5. **Live Previews**: Update preview as user edits

## Best Practices

1. **Use for Simple Cases**: Two-way binding is great for simple forms
2. **Consider Performance**: Too many bindings can impact performance
3. **Handle Edge Cases**: Empty values, null, undefined
4. **Clean Up Listeners**: Remove event listeners when not needed
5. **Use Libraries**: Consider using frameworks (Vue, Angular) for complex cases
6. **Test Thoroughly**: Ensure both directions work correctly

## Comparison with Frameworks

### Vue.js
```javascript
// Vue automatically provides two-way binding
data() {
  return {
    message: ''
  }
}
// v-model provides two-way binding
<input v-model="message">
```

### Angular
```typescript
// Angular uses [(ngModel)] for two-way binding
<input [(ngModel)]="message">
```

### React
```javascript
// React uses controlled components (one-way with manual sync)
const [message, setMessage] = useState('');
<input value={message} onChange={(e) => setMessage(e.target.value)} />
```

## Limitations

1. **Performance**: Can be slower than one-way binding for large datasets
2. **Complexity**: Can become complex with nested objects
3. **Debugging**: Harder to trace data flow
4. **Memory**: May create memory leaks if not cleaned up properly
