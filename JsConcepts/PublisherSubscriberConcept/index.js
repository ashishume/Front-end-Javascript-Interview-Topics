/**
 * Ref: https://medium.com/@thebabscraig/javascript-design-patterns-part-2-the-publisher-subscriber-pattern-8fe07e157213
 *
 * Pub sub concept ,
 * The Publisher/Subscriber pattern, or “PubSub” for short, is a pattern that
 * allows us to create modules that can communicate with each other without
 * depending directly on each other
 */

class PubSub {
  /** added a sample object to store all key and value pair functions */
  constructor() {
    this.sampleData = {};
  }

  /** subscribes to the event
   * @param eventName event name as key
   * @param func function as parameter
   */
  subscribe(eventName, func) {
    let index;

    if (!this.sampleData[eventName]) this.sampleData[eventName] = [];

    //push statement returns the index which we store to a variable and use that for unsubscribe
    index = this.sampleData[eventName].push(func) - 1;

    return {
      /** un-subscribes to the event as retutn statement
       */
      unsubscribe: () => {
        this.sampleData[eventName].splice(index, 1);
      },
    };
  }

  /**
   * the event to published
   * @param eventName
   * @param  args all the arguments to pass in the func
   */
  publish(eventName, ...args) {
    if (!this.sampleData[eventName]) return;

    this.sampleData[eventName].forEach((func) => {
      func.apply(null, args);
    });
  }
}

const pubSub = new PubSub();

let subs;

subs = pubSub.subscribe("activate", (x) => {
  console.log(x + 1);
  subs.unsubscribe();
});
pubSub.publish("activate", 1); //prints 2
pubSub.publish("activate", 2); //does not print anything as already unsubscribed in line 57
