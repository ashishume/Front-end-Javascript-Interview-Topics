# Throttler Queue Multiple Button Clicks in JavaScript

## Overview
Throttling multiple button clicks involves processing a queue of click events while limiting the rate of execution. This prevents overwhelming the system with rapid clicks and ensures controlled, sequential processing of user actions.

## Basic Implementation

```javascript
/** Design a throttler */

const throttler = (arr, limit, callback, delay) => {
  let flag = true;
  let queue = [...arr];
  return function () {
    if (flag) {
      const tasks = queue.splice(0, limit); // This method can be replaced with any callback method as per the use case
      callback(tasks);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
};

const newBtn = document.getElementById("btn");

newBtn.addEventListener(
  "click",
  throttler(
    [1, 2, 3, 4, 5, 6, 7, 8],
    2,
    (tasks) => {
      console.log(tasks);
    },
    2000
  )
);
```

## Enhanced Implementation

### With Queue Management
```javascript
class ThrottledQueue {
  constructor(limit, delay, processor) {
    this.limit = limit;
    this.delay = delay;
    this.processor = processor;
    this.queue = [];
    this.processing = false;
    this.timerId = null;
  }

  add(item) {
    this.queue.push(item);
    this.process();
  }

  process() {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;
    const batch = this.queue.splice(0, this.limit);
    
    this.processor(batch);

    if (this.queue.length > 0) {
      this.timerId = setTimeout(() => {
        this.processing = false;
        this.process();
      }, this.delay);
    } else {
      this.processing = false;
    }
  }

  clear() {
    this.queue = [];
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.processing = false;
  }

  getQueueLength() {
    return this.queue.length;
  }
}
```

## Use Cases

### 1. API Request Throttling
```javascript
const apiThrottler = new ThrottledQueue(3, 1000, async (requests) => {
  await Promise.all(requests.map(req => fetch(req.url)));
});

button.addEventListener('click', () => {
  apiThrottler.add({ url: '/api/data' });
});
```

### 2. Form Submission
```javascript
const formThrottler = new ThrottledQueue(1, 2000, (submissions) => {
  submissions.forEach(data => submitForm(data));
});
```

## Best Practices

1. **Set Reasonable Limits**: Balance user experience and system load
2. **Provide Feedback**: Show queue status to users
3. **Handle Errors**: Graceful error handling for failed items
4. **Clear Queue**: Provide way to clear queue
5. **Monitor Queue**: Track queue size for debugging
