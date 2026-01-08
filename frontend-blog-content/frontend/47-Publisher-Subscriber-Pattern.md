# Publisher Subscriber Pattern in JavaScript

The Publisher/Subscriber (PubSub) pattern is a messaging pattern where senders of messages (publishers) don't program the messages to be sent directly to specific receivers (subscribers). Instead, publishers and subscribers are decoupled through a message broker or event channel.

## What is the PubSub Pattern?

The PubSub pattern allows modules to communicate with each other without depending directly on each other. It's a form of loose coupling that promotes better code organization and maintainability.

### Key Concepts

- **Publisher**: The component that publishes events/messages
- **Subscriber**: The component that listens for and reacts to events
- **Topic/Channel**: The medium through which publishers and subscribers communicate
- **Decoupling**: Publishers don't know about subscribers, and vice versa

## Basic Implementation

Here's a simple PubSub implementation:

```javascript
class PubSub {
  constructor() {
    this.topics = {};
  }

  subscribe(topic, callback) {
    // Create the topic if it doesn't exist
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    // Add the callback to the topic's subscribers
    this.topics[topic].push(callback);

    // Return a reference to the subscription (useful for unsubscribing)
    return {
      topic,
      callback,
    };
  }

  // Publish to a topic
  publish(topic, data) {
    if (!this.topics[topic] || !this.topics[topic].length) {
      return;
    }

    // Notify all subscribers with the provided data
    this.topics[topic].forEach((callback) => {
      callback(data);
    });
  }

  // Unsubscribe from a topic
  unsubscribe(subscription) {
    const { topic, callback } = subscription;

    // If the topic exists and has subscribers, remove the specified callback
    if (this.topics[topic]) {
      this.topics[topic] = this.topics[topic].filter((val) => val !== callback);

      // If no more subscribers for the topic, remove the topic
      if (!this.topics[topic].length) {
        delete this.topics[topic];
      }
    }
  }
}

// Usage
const pubSub = new PubSub();

// Subscribe to a topic
const subscription = pubSub.subscribe("news", (data) => {
  console.log("Received news:", data);
});

// Publish to the 'news' topic
pubSub.publish("news", "Breaking news: JavaScript is awesome!");

// Unsubscribe from the topic
pubSub.unsubscribe(subscription);
```

## How It Works

1. **Subscribers register** for topics they're interested in
2. **Publishers send messages** to topics without knowing who's listening
3. **The PubSub system** routes messages to all subscribers of that topic
4. **Subscribers can unsubscribe** when they no longer need updates

## Real-World Examples

### Example 1: News System

```javascript
const pubSub = new PubSub();

// Multiple subscribers for the same topic
const subscriber1 = pubSub.subscribe("news", (article) => {
  console.log("Subscriber 1 received:", article.title);
});

const subscriber2 = pubSub.subscribe("news", (article) => {
  console.log("Subscriber 2 received:", article.title);
});

// Publisher sends news
pubSub.publish("news", {
  title: "New JavaScript Features",
  content: "ES2024 introduces new features...",
});

// Output:
// Subscriber 1 received: New JavaScript Features
// Subscriber 2 received: New JavaScript Features
```

### Example 2: E-commerce System

```javascript
const pubSub = new PubSub();

// Cart service subscribes to product updates
pubSub.subscribe("product:added", (product) => {
  console.log(`Product ${product.name} added to cart`);
  updateCartUI(product);
});

// Inventory service subscribes to the same event
pubSub.subscribe("product:added", (product) => {
  decreaseInventory(product.id);
});

// Checkout service subscribes to purchase events
pubSub.subscribe("purchase:completed", (order) => {
  processPayment(order);
  sendConfirmationEmail(order);
});

// When user adds product
pubSub.publish("product:added", {
  id: 123,
  name: "Laptop",
  price: 999
});

// When purchase completes
pubSub.publish("purchase:completed", {
  orderId: "ORD-123",
  items: [...],
  total: 1998
});
```

### Example 3: UI Component Communication

```javascript
const pubSub = new PubSub();

// Header component subscribes to search events
pubSub.subscribe("search:performed", (query) => {
  updateSearchHistory(query);
});

// Sidebar subscribes to filter changes
pubSub.subscribe("filter:changed", (filters) => {
  updateSidebarFilters(filters);
});

// Main content area subscribes to both
pubSub.subscribe("search:performed", (query) => {
  performSearch(query);
});

pubSub.subscribe("filter:changed", (filters) => {
  applyFilters(filters);
});

// User performs search
pubSub.publish("search:performed", "JavaScript");

// User changes filters
pubSub.publish("filter:changed", { category: "tech", price: "under-100" });
```

## Advanced Features

### 1. Once Subscription

Subscribe to an event only once:

```javascript
class PubSub {
  // ... existing code ...

  subscribeOnce(topic, callback) {
    const subscription = this.subscribe(topic, (data) => {
      callback(data);
      this.unsubscribe(subscription);
    });
    return subscription;
  }
}

// Usage
pubSub.subscribeOnce("user:login", (user) => {
  console.log("User logged in:", user.name);
  // Automatically unsubscribes after first event
});
```

### 2. Priority Subscribers

Execute subscribers in a specific order:

```javascript
class PubSub {
  constructor() {
    this.topics = {};
  }

  subscribe(topic, callback, priority = 0) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    this.topics[topic].push({ callback, priority });
    // Sort by priority (higher priority first)
    this.topics[topic].sort((a, b) => b.priority - a.priority);

    return { topic, callback };
  }

  publish(topic, data) {
    if (!this.topics[topic]) return;

    this.topics[topic].forEach(({ callback }) => {
      callback(data);
    });
  }
}

// Usage
pubSub.subscribe("event", handler1, 10); // Executes first
pubSub.subscribe("event", handler2, 5); // Executes second
pubSub.subscribe("event", handler3, 1); // Executes third
```

### 3. Wildcard Topics

Subscribe to multiple topics using patterns:

```javascript
class PubSub {
  // ... existing code ...

  subscribe(pattern, callback) {
    // Check if it's a wildcard pattern
    if (pattern.includes("*")) {
      const regex = new RegExp("^" + pattern.replace(/\*/g, ".*") + "$");
      // Store with special marker
      if (!this.topics["__wildcards__"]) {
        this.topics["__wildcards__"] = [];
      }
      this.topics["__wildcards__"].push({ pattern: regex, callback });
      return { pattern, callback, isWildcard: true };
    }

    // Regular subscription
    if (!this.topics[pattern]) {
      this.topics[pattern] = [];
    }
    this.topics[pattern].push(callback);
    return { topic: pattern, callback };
  }

  publish(topic, data) {
    // Regular subscribers
    if (this.topics[topic]) {
      this.topics[topic].forEach((callback) => callback(data));
    }

    // Wildcard subscribers
    if (this.topics["__wildcards__"]) {
      this.topics["__wildcards__"].forEach(({ pattern, callback }) => {
        if (pattern.test(topic)) {
          callback(data);
        }
      });
    }
  }
}

// Usage
pubSub.subscribe("user:*", (data) => {
  console.log("Any user event:", data);
});

pubSub.publish("user:login", { name: "John" });
pubSub.publish("user:logout", { name: "John" });
// Both trigger the wildcard subscriber
```

## PubSub vs Observer Pattern

| Aspect            | Observer Pattern                          | PubSub Pattern                  |
| ----------------- | ----------------------------------------- | ------------------------------- |
| **Coupling**      | Direct coupling (subject knows observers) | Loose coupling (via topics)     |
| **Communication** | Direct method calls                       | Message-based                   |
| **Scalability**   | Limited by direct references              | Highly scalable                 |
| **Flexibility**   | Less flexible                             | More flexible (wildcards, etc.) |

## Benefits

1. **Decoupling**: Publishers and subscribers don't know about each other
2. **Scalability**: Easy to add new subscribers without modifying publishers
3. **Flexibility**: Subscribers can be added/removed dynamically
4. **Maintainability**: Changes to one component don't affect others
5. **Testability**: Easy to test components in isolation

## Use Cases

- **Event-driven architectures**: Microservices communication
- **UI frameworks**: Component communication
- **Plugin systems**: Plugin-to-core communication
- **Real-time applications**: WebSocket message routing
- **Logging systems**: Multiple log handlers
- **Analytics**: Tracking various events

## Best Practices

1. **Use descriptive topic names**: `"user:login"` instead of `"event1"`
2. **Document topics**: Maintain a list of available topics
3. **Handle errors**: Wrap callbacks in try-catch
4. **Clean up**: Always unsubscribe when components are destroyed
5. **Avoid overuse**: Don't use PubSub for simple direct communication

## Common Pitfalls

1. **Memory leaks**: Forgetting to unsubscribe
2. **Topic name collisions**: Use namespacing (`"module:event"`)
3. **Circular dependencies**: Be careful with publish-subscribe cycles
4. **Performance**: Too many subscribers can slow down publishing

## Integration with Frameworks

### React Example

```javascript
// pubsub.js
export const pubSub = new PubSub();

// Component A
import { pubSub } from "./pubSub";

function ComponentA() {
  const handleClick = () => {
    pubSub.publish("button:clicked", { id: 123 });
  };
  return <button onClick={handleClick}>Click me</button>;
}

// Component B
function ComponentB() {
  useEffect(() => {
    const subscription = pubSub.subscribe("button:clicked", (data) => {
      console.log("Button was clicked:", data);
    });

    return () => pubSub.unsubscribe(subscription);
  }, []);

  return <div>Listening for clicks...</div>;
}
```

## Summary

The Publisher/Subscriber pattern is a powerful design pattern for creating loosely coupled, scalable applications. It enables components to communicate without direct dependencies, making code more maintainable and testable. Use it when you need flexible, event-driven communication between components.
