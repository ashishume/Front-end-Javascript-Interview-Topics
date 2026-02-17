# Object Property Descriptors (Detailed) in JavaScript

## Overview
Object Property Descriptors allow you to configure and control the behavior of object properties in JavaScript. They provide fine-grained control over how properties can be accessed, modified, and enumerated, enabling you to create more robust and secure objects.

## Basic Example

```javascript
/**
 * Demonstrates Object property descriptors and their configuration
 * Shows how to define and inspect property attributes
 */

// Create a sample object
const obj = {
  a: "sample value",
  b: 1,
  c: 4,
};

// Configure single property
Object.defineProperty(obj, "a", {
  enumerable: false, // Property won't show up in for...in loops
});

// Configure multiple properties
Object.defineProperties(obj, {
  b: {
    enumerable: false, // Property won't show up in for...in loops
  },
  c: {
    enumerable: true,
    configurable: false, // Property cannot be deleted or reconfigured
  },
});
```

## Property Descriptor Attributes

### value
The value associated with the property.

### writable
If `false`, the value cannot be changed.

### enumerable
If `false`, the property won't appear in `for...in` loops or `Object.keys()`.

### configurable
If `false`, the property cannot be deleted or its attributes cannot be changed.

### get
A function that serves as a getter for the property.

### set
A function that serves as a setter for the property.

## Getting Descriptors

### Single Property
```javascript
console.log(Object.getOwnPropertyDescriptor(obj, "a"));
// Output:
// {
//   value: 'sample value',
//   writable: true,     // Can be modified
//   enumerable: false,  // Won't show in loops
//   configurable: true  // Can be reconfigured
// }
```

### All Properties
```javascript
console.log(Object.getOwnPropertyDescriptors(obj));
// Returns descriptors for all properties
```

## Use Cases

### 1. Read-Only Properties
```javascript
Object.defineProperty(obj, 'readOnly', {
  value: 'cannot change',
  writable: false,
  enumerable: true,
  configurable: false
});
```

### 2. Computed Properties
```javascript
Object.defineProperty(obj, 'fullName', {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(value) {
    [this.firstName, this.lastName] = value.split(' ');
  },
  enumerable: true,
  configurable: true
});
```

### 3. Hidden Properties
```javascript
Object.defineProperty(obj, 'internal', {
  value: 'secret',
  enumerable: false,
  writable: true,
  configurable: true
});
```

## Best Practices

1. **Use for Control**: When you need fine-grained control
2. **Document Behavior**: Make descriptor behavior clear
3. **Consider Performance**: Descriptors have slight overhead
4. **Security**: Use for creating secure objects
5. **API Design**: Useful for library APIs
