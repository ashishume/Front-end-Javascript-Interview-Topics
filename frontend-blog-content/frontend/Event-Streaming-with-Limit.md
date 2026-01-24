# Event Streaming with Limit in JavaScript

## Overview
Event streaming with limit maintains a sliding window of the most recent events, processing only the latest N events while discarding older ones. This is useful for rate limiting, buffering recent activity, and managing memory in event-driven applications.

## Basic Implementation

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const generateEventButton = document.getElementById("generateEvent");
  const outputDiv = document.getElementById("output");

  // Parameters
  const windowSize = 5; // Adjust the window size as needed
  const events = [];

  // Function to process the events within the window
  function processEvents(events) {
    // For demonstration, we'll just log the events to the output div
    const eventList = events.map((event) => `<li>${event}</li>`).join("");
    outputDiv.innerHTML = `<ul>${eventList}</ul>`;
  }

  // Function to add a new event to the stream
  function addEvent(event) {
    events.push(event);

    // Maintain the window size
    if (events.length > windowSize) {
      events.shift(); // Remove the oldest event
    }

    // Process the current window of events
    processEvents(events);
  }

  // Event listener for the button
  generateEventButton.addEventListener("click", () => {
    const newEvent = `Event ${new Date().toLocaleTimeString()}`;
    addEvent(newEvent);
  });
});
```

## Enhanced Implementation

### Class-Based Event Stream
```javascript
class EventStream {
  constructor(windowSize = 5) {
    this.windowSize = windowSize;
    this.events = [];
    this.processors = [];
  }

  addEvent(event) {
    this.events.push({
      data: event,
      timestamp: Date.now()
    });

    // Maintain window size
    if (this.events.length > this.windowSize) {
      this.events.shift();
    }

    // Notify processors
    this.processors.forEach(processor => {
      processor(this.events);
    });
  }

  subscribe(processor) {
    this.processors.push(processor);
    return () => {
      this.processors = this.processors.filter(p => p !== processor);
    };
  }

  getEvents() {
    return [...this.events];
  }

  clear() {
    this.events = [];
  }
}
```

## Use Cases

### 1. Recent Activity Feed
```javascript
const activityStream = new EventStream(10);
activityStream.subscribe((events) => {
  displayRecentActivity(events);
});
```

### 2. Error Logging
```javascript
const errorStream = new EventStream(50);
errorStream.subscribe((errors) => {
  sendToMonitoringService(errors);
});
```

### 3. User Actions Tracking
```javascript
const actionStream = new EventStream(20);
actionStream.addEvent({ type: 'click', element: 'button' });
```

## Best Practices

1. **Set Appropriate Limits**: Balance memory vs history
2. **Process Efficiently**: Batch processing when possible
3. **Handle Overflow**: Decide on overflow behavior
4. **Memory Management**: Clear old events regularly
5. **Thread Safety**: Consider concurrency if needed
