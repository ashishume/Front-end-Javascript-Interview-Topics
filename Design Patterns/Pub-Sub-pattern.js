// follow js file
// ./JsConcepts/PublisherSubscriberConcept/index.js
/**
 * 
    many-to-many relationship between publishers and subscribers.

     - In Pub/Sub, subscribers don't have direct references to publishers. 
     - They subscribe to events or channels and are notified when events occur. 
     - Publishers are not aware of the subscribers.
     - Subscribers don't need to know about the existence of other subscribers or publishers; 
     - they just react to events they are interested in.
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