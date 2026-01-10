# Event Emitter Pattern in JavaScript

## Overview
The Event Emitter pattern is a design pattern where an object (emitter) maintains a list of listeners and notifies them when events occur. It's the foundation of Node.js's EventEmitter and is commonly used for implementing pub-sub patterns.

## Basic Implementation

```javascript
class EventEmitter {
  constructor() {
    this._events = {};
  }

  // Subscribe to an event
  on(eventName, listener) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].push(listener);
  }

  // Emit an event
  emit(eventName, data) {
    if (!this._events[eventName]) {
      return;
    }
    this._events[eventName].forEach((listener) => {
      listener(data);
    });
  }

  // Remove a listener
  removeListener(eventName, listenerToRemove) {
    if (!this._events[eventName]) {
      throw new Error(`Event ${eventName} doesn't exist`);
    }
    this._events[eventName] = this._events[eventName].filter(
      (listener) => listener !== listenerToRemove
    );
  }

  // Remove all listeners for an event
  removeAllListeners(eventName) {
    if (eventName) {
      delete this._events[eventName];
    } else {
      this._events = {};
    }
  }
}
```

## Usage Example

```javascript
const emitter = new EventEmitter();

// Subscribe to event
emitter.on("userLogin", (userData) => {
  console.log("User logged in:", userData);
});

emitter.on("userLogin", (userData) => {
  console.log("Sending welcome email to:", userData.email);
});

// Emit event
emitter.emit("userLogin", { name: "John", email: "john@example.com" });
// User logged in: { name: "John", email: "john@example.com" }
// Sending welcome email to: john@example.com
```

## Enhanced Implementation

```javascript
class EnhancedEventEmitter {
  constructor() {
    this._events = {};
    this._maxListeners = 10;
  }

  on(eventName, listener) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    
    // Check max listeners
    if (this._events[eventName].length >= this._maxListeners) {
      console.warn(`Max listeners (${this._maxListeners}) reached for ${eventName}`);
    }
    
    this._events[eventName].push(listener);
    return this; // Enable chaining
  }

  // Subscribe once (remove after first call)
  once(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.removeListener(eventName, wrapper);
    };
    this.on(eventName, wrapper);
    return this;
  }

  emit(eventName, ...args) {
    if (!this._events[eventName]) {
      return false;
    }
    
    this._events[eventName].forEach((listener) => {
      listener(...args);
    });
    
    return true;
  }

  removeListener(eventName, listenerToRemove) {
    if (!this._events[eventName]) {
      return this;
    }
    
    this._events[eventName] = this._events[eventName].filter(
      (listener) => listener !== listenerToRemove
    );
    
    return this;
  }

  // Get all listeners for an event
  listeners(eventName) {
    return this._events[eventName] || [];
  }

  // Get count of listeners
  listenerCount(eventName) {
    return this._events[eventName]?.length || 0;
  }
}
```

## Practical Examples

### User Management System

```javascript
class UserManager extends EventEmitter {
  login(user) {
    // Perform login logic
    this.emit("login", user);
  }

  logout(user) {
    // Perform logout logic
    this.emit("logout", user);
  }
}

const userManager = new UserManager();

// Set up listeners
userManager.on("login", (user) => {
  console.log(`User ${user.name} logged in`);
  updateUI(user);
});

userManager.on("logout", (user) => {
  console.log(`User ${user.name} logged out`);
  clearSession(user);
});

// Trigger events
userManager.login({ name: "John", id: 1 });
```

### Once Pattern

```javascript
const emitter = new EnhancedEventEmitter();

// This listener will only fire once
emitter.once("dataReceived", (data) => {
  console.log("Data received (once):", data);
});

emitter.emit("dataReceived", "First");  // Fires
emitter.emit("dataReceived", "Second"); // Doesn't fire (removed)
```

## Node.js EventEmitter

Node.js has a built-in EventEmitter:

```javascript
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("event", (data) => {
  console.log("Event occurred:", data);
});

myEmitter.emit("event", "Hello World");
```

## Use Cases

1. **Decoupled Communication**: Components communicate without direct references
2. **Plugin Systems**: Allow plugins to subscribe to application events
3. **State Management**: Notify subscribers of state changes
4. **Custom Events**: Create domain-specific event systems

## Benefits

- **Loose Coupling**: Emitters and listeners don't need direct references
- **Scalability**: Easy to add/remove listeners
- **Flexibility**: Multiple listeners for same event
- **Separation of Concerns**: Business logic separated from event handling

## Key Points
- Implements observer/pub-sub pattern
- Allows objects to emit and listen to events
- Enables decoupled communication between components
- Common in Node.js and frontend frameworks
- Supports multiple listeners per event
- Can implement `once()` for one-time listeners

