/**
 * Ref: https://medium.com/@thebabscraig/javascript-design-patterns-part-2-the-publisher-subscriber-pattern-8fe07e157213
 *
 * Pub sub concept ,
 * The Publisher/Subscriber pattern, or “PubSub” for short, is a pattern that
 * allows us to create modules that can communicate with each other without
 * depending directly on each other
 */
class PubSub {
  constructor() {
    this.topics = {};
  }
  subscribe(topic, callback) {
    // Create the topic if it doesn't exist
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    this.topics[topic].push(callback);

    // Return a reference to the subscription (useful for unsubscribing)
    return {
      topic,
      callback,
    };
  }

  // Publish to a topic
  publish(topic, data) {
    if (!this.topics[topic] && !this.topics[topic]?.length) {
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

const pubSub = new PubSub();

// Subscribe to a topic
const subscription = pubSub.subscribe("news", (data) => {
  console.log("Received news:", data);
});

// Publish to the 'news' topic
pubSub.publish("news", "Breaking news: JavaScript is awesome!");

// Unsubscribe from the topic
pubSub.unsubscribe(subscription);

// below is a separate concept----------------------------------------

/**
 * Attaching listeners to prototyoe
 */
// Array.prototype.listeners = {};
// Array.prototype.addListener = function (eventName, callback) {
//   if (!this.listeners[eventName]) {
//     // Create a new array for new events
//     // idea of an array is we can invoke all callbacks
//     this.listeners[eventName] = [];
//   }
//   this.listeners[eventName].push(callback);
// };
// // New push Method
// // Calls trigger event
// Array.prototype.pushWithEvent = function () {
//   const size = this.length;
//   const argsList = Array.prototype.slice.call(arguments); // can also be writen as `Array.from(arguments)`
//   for (let index = 0; index < argsList.length; index++) {
//     this[size + index] = argsList[index];
//   }
//   // trigger add event
//   this.triggerEvent("add", argsList);
// };

// /** checking if eventName exists or not, if yes then call the callbacks passed with `this` context */
// Array.prototype.triggerEvent = function (eventName, elements) {
//   if (this.listeners[eventName] && this.listeners[eventName].length) {
//     this.listeners[eventName].forEach((callback) => callback(eventName, elements, this));
//   }
// };

// const a = [];

// /** create the listner first with eventName */
// a.addListener("add", (items, args) => {
//   console.log("items were added", args);
// });
// /** push new items */
// a.pushWithEvent(1, 2, 3, "a", "b");
// /** push new items */
// a.pushWithEvent("hello");
// /** push new items */
// a.pushWithEvent(55);
// /** push new items */
// setTimeout(() => {
//   a.pushWithEvent("delayed");
// }, 3000);

// console.log(a);
