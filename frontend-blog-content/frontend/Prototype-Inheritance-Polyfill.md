# Prototype Inheritance Polyfill in JavaScript

## Overview
Prototype inheritance is a fundamental concept in JavaScript for implementing object-oriented programming. A polyfill for Object.create() ensures compatibility in environments that don't support it natively, allowing you to create objects with a specified prototype.

## Basic Polyfill

```javascript
// Polyfill for prototype inheritance
if (!Object.create) {
  Object.create = function (proto) {
    function F() {}
    F.prototype = proto;
    return new F();
  };
}
```

## Usage Example

```javascript
// Parent class
function Animal(name) {
  this.name = name;
}

Animal.prototype.sayName = function () {
  console.log("My name is " + this.name);
};

// Child class inheriting from Animal
function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);   // Created a new object with the properties of base class
Dog.prototype.constructor = Dog;       

Dog.prototype.bark = function () {   // Method added in child class
  console.log("Woof! I am a " + this.breed);
};

// Creating instances
var dog1 = new Dog("Max", "Labrador");
dog1.sayName(); // (method from base class)  // Output: My name is Max
dog1.bark(); // (method from child class)  // Output: Woof! I am a Labrador
```

## Enhanced Polyfill

### With Property Descriptors
```javascript
if (!Object.create) {
  Object.create = function(proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
      throw new TypeError('Object prototype may only be an Object or null');
    }
    
    function F() {}
    F.prototype = proto;
    const obj = new F();
    
    if (propertiesObject !== undefined) {
      Object.defineProperties(obj, propertiesObject);
    }
    
    if (proto === null) {
      obj.__proto__ = null;
    }
    
    return obj;
  };
}
```

## How It Works

1. **Create Empty Function**: Creates a temporary constructor function
2. **Set Prototype**: Assigns the provided prototype to the function's prototype
3. **Create Instance**: Uses `new` to create an instance with the correct prototype
4. **Return Object**: Returns the new object with the specified prototype chain

## Use Cases

### 1. Inheritance Pattern
```javascript
function Parent() {}
Parent.prototype.method = function() {};

function Child() {
  Parent.call(this);
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
```

### 2. Prototype Chain
```javascript
const base = { x: 1 };
const derived = Object.create(base);
derived.y = 2;
console.log(derived.x); // 1 (from prototype)
console.log(derived.y); // 2 (own property)
```

## Best Practices

1. **Check Native Support**: Always check if native method exists
2. **Set Constructor**: Always set constructor property
3. **Call Parent**: Use Parent.call(this) in child constructor
4. **Use Modern Syntax**: Prefer ES6 classes in modern code
5. **Understand Prototype Chain**: Know how prototype chain works
