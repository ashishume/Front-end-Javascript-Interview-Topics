# Object Property Descriptors in JavaScript

Object Property Descriptors allow you to configure and control the behavior of object properties in JavaScript. They provide fine-grained control over how properties can be accessed, modified, and enumerated, enabling you to create more robust and secure objects.

## What are Property Descriptors?

A property descriptor is an object that describes the attributes of a property. It controls:

- Whether a property can be modified (`writable`)
- Whether a property can be deleted or reconfigured (`configurable`)
- Whether a property appears in enumeration (`enumerable`)
- The property's value (`value`) or getter/setter functions

## Property Descriptor Attributes

### 1. `value`

The value associated with the property. Default: `undefined`

### 2. `writable`

If `false`, the property value cannot be changed. Default: `false` for descriptors created with `Object.defineProperty()`, `true` for normal properties

### 3. `enumerable`

If `true`, the property will be enumerated in `for...in` loops and `Object.keys()`. Default: `false`

### 4. `configurable`

If `false`, the property cannot be deleted or its attributes cannot be changed. Default: `false`

### 5. `get` (Accessor Descriptor)

A function that serves as a getter for the property. Cannot be used with `value` or `writable`

### 6. `set` (Accessor Descriptor)

A function that serves as a setter for the property. Cannot be used with `value` or `writable`

## Defining Property Descriptors

### Single Property: `Object.defineProperty()`

```javascript
const obj = {
  a: "sample value",
  b: 1,
  c: 4,
};

// Configure a single property
Object.defineProperty(obj, "a", {
  enumerable: false, // Property won't show up in for...in loops
});

// Get descriptor for a property
console.log(Object.getOwnPropertyDescriptor(obj, "a"));
// Output:
// {
//   value: 'sample value',
//   writable: true,
//   enumerable: false,  // Changed to false
//   configurable: true
// }
```

### Multiple Properties: `Object.defineProperties()`

```javascript
const obj = {
  a: "sample value",
  b: 1,
  c: 4,
};

// Configure multiple properties at once
Object.defineProperties(obj, {
  b: {
    enumerable: false, // Won't show in loops
  },
  c: {
    enumerable: true,
    configurable: false, // Cannot be deleted or reconfigured
  },
});

// Get descriptors for all properties
console.log(Object.getOwnPropertyDescriptors(obj));
```

## Property Descriptor Examples

### Example 1: Non-Enumerable Property

```javascript
const obj = {
  publicProp: "I'm public",
};

Object.defineProperty(obj, "privateProp", {
  value: "I'm private",
  enumerable: false,
});

// Only enumerable properties appear
for (let key in obj) {
  console.log(key); // Only "publicProp"
}

console.log(Object.keys(obj)); // ["publicProp"]
console.log(obj.privateProp); // "I'm private" - still accessible!
```

### Example 2: Non-Writable Property

```javascript
const obj = {};

Object.defineProperty(obj, "readOnly", {
  value: "Cannot change me",
  writable: false,
});

obj.readOnly = "New value"; // Silent failure in non-strict mode
console.log(obj.readOnly); // "Cannot change me"

// In strict mode, this would throw an error
```

### Example 3: Non-Configurable Property

```javascript
const obj = {};

Object.defineProperty(obj, "locked", {
  value: "I'm locked",
  configurable: false,
});

// Cannot delete
delete obj.locked; // Returns false, property still exists
console.log(obj.locked); // "I'm locked"

// Cannot reconfigure
Object.defineProperty(obj, "locked", {
  enumerable: false, // Error: Cannot redefine property
});
```

### Example 4: Complete Configuration

```javascript
const obj = {};

Object.defineProperty(obj, "fullyConfigured", {
  value: "Initial value",
  writable: true, // Can be modified
  enumerable: true, // Shows in loops
  configurable: true, // Can be deleted/reconfigured
});

// Later, you can change it
Object.defineProperty(obj, "fullyConfigured", {
  value: "New value",
  writable: false, // Now it's read-only
  enumerable: false, // Now it's hidden
  configurable: false, // Now it's locked
});
```

## Accessor Descriptors (Getters and Setters)

Instead of `value` and `writable`, you can use `get` and `set`:

```javascript
const obj = {
  _temperature: 0,
};

Object.defineProperty(obj, "temperature", {
  get() {
    return this._temperature;
  },
  set(value) {
    if (value < -273.15) {
      throw new Error("Temperature cannot be below absolute zero");
    }
    this._temperature = value;
  },
  enumerable: true,
  configurable: true,
});

obj.temperature = 25;
console.log(obj.temperature); // 25

obj.temperature = -300; // Error in strict mode
```

### Computed Properties with Getters

```javascript
const rectangle = {
  width: 10,
  height: 5,
};

Object.defineProperty(rectangle, "area", {
  get() {
    return this.width * this.height;
  },
  enumerable: true,
  configurable: true,
});

console.log(rectangle.area); // 50
rectangle.width = 20;
console.log(rectangle.area); // 100 (automatically recalculated)
```

## Real-World Use Cases

### 1. Creating Constants

```javascript
const config = {};

Object.defineProperty(config, "API_URL", {
  value: "https://api.example.com",
  writable: false,
  enumerable: true,
  configurable: false,
});

// config.API_URL = "new url"; // Won't work
```

### 2. Hiding Internal Properties

```javascript
class BankAccount {
  constructor(balance) {
    this._balance = balance;

    // Hide internal balance from enumeration
    Object.defineProperty(this, "_balance", {
      enumerable: false,
      writable: true,
      configurable: false,
    });
  }

  get balance() {
    return this._balance;
  }
}

const account = new BankAccount(1000);
console.log(Object.keys(account)); // ["balance"] - _balance is hidden
```

### 3. Validation with Setters

```javascript
function createValidatedObject() {
  const obj = {
    _age: 0,
  };

  Object.defineProperty(obj, "age", {
    get() {
      return this._age;
    },
    set(value) {
      if (typeof value !== "number" || value < 0 || value > 150) {
        throw new Error("Invalid age");
      }
      this._age = value;
    },
    enumerable: true,
    configurable: true,
  });

  return obj;
}

const person = createValidatedObject();
person.age = 25; // OK
// person.age = -5; // Error
```

### 4. Property Observation

```javascript
function createObservable(obj, property, callback) {
  let value = obj[property];

  Object.defineProperty(obj, property, {
    get() {
      return value;
    },
    set(newValue) {
      const oldValue = value;
      value = newValue;
      callback(newValue, oldValue);
    },
    enumerable: true,
    configurable: true,
  });
}

const user = { name: "John" };
createObservable(user, "name", (newVal, oldVal) => {
  console.log(`Name changed from ${oldVal} to ${newVal}`);
});

user.name = "Jane"; // Logs: "Name changed from John to Jane"
```

## Getting Property Descriptors

### Single Property

```javascript
const obj = { name: "John" };
Object.defineProperty(obj, "age", {
  value: 30,
  writable: false,
  enumerable: true,
  configurable: true,
});

const descriptor = Object.getOwnPropertyDescriptor(obj, "age");
console.log(descriptor);
// {
//   value: 30,
//   writable: false,
//   enumerable: true,
//   configurable: true
// }
```

### All Properties

```javascript
const descriptors = Object.getOwnPropertyDescriptors(obj);
console.log(descriptors);
// {
//   name: { value: "John", writable: true, enumerable: true, configurable: true },
//   age: { value: 30, writable: false, enumerable: true, configurable: true }
// }
```

## Default Values

When using `Object.defineProperty()`, if you don't specify attributes, they default to `false`:

```javascript
const obj = {};
Object.defineProperty(obj, "prop", { value: 42 });

// Defaults:
// writable: false
// enumerable: false
// configurable: false
```

When creating properties normally, they default to `true`:

```javascript
const obj = { prop: 42 };
// writable: true
// enumerable: true
// configurable: true
```

## Data Descriptors vs Accessor Descriptors

### Data Descriptor

- Has `value` and optionally `writable`
- Cannot have `get` or `set`

### Accessor Descriptor

- Has `get` and/or `set`
- Cannot have `value` or `writable`

```javascript
// Data descriptor
Object.defineProperty(obj, "data", {
  value: 42,
  writable: true,
});

// Accessor descriptor
Object.defineProperty(obj, "accessor", {
  get() {
    return this._value;
  },
  set(v) {
    this._value = v;
  },
});
```

## Best Practices

1. **Use for Constants**: Create truly constant values
2. **Hide Implementation**: Make internal properties non-enumerable
3. **Add Validation**: Use setters for input validation
4. **Computed Properties**: Use getters for derived values
5. **Observable Patterns**: Implement property change notifications
6. **Security**: Lock down properties that shouldn't be modified

## Summary

Property descriptors give you powerful control over object properties:

- **`writable`**: Controls if a property can be modified
- **`enumerable`**: Controls if a property appears in iterations
- **`configurable`**: Controls if a property can be deleted/reconfigured
- **`get`/`set`**: Create computed or validated properties

Understanding property descriptors is essential for creating robust, secure, and well-designed JavaScript objects.
