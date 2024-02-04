/**
 * 
example: sending user notifications

NOTE: pubsub and observer are 2 different patterns

- this one-to-many relationship
- The subject maintains a list of observers, and when its state changes, it notifies all registered observers.
- Observers are notified whenever there is a specific change in the subject's state.
- Observers have more control over their subscription to the subject. 
- They can choose to subscribe or unsubscribe based on their needs.
- observers have more control over their subscription to the subject.

Best real example: Behaviour subject in angular :D
*/


// Subject
class Subject {
    constructor() {
      this.observers = [];
    }
  
    addObserver(observer) {
      this.observers.push(observer);
    }
  
    removeObserver(observer) {
      this.observers = this.observers.filter((obs) => obs !== observer);
    }
  
    notifyObservers() {
      this.observers.forEach((observer) => {
        observer.update();
      });
    }
  }
  
  // Observer
  class Observer {
    constructor(name) {
      this.name = name;
    }
  
    update() {
      console.log(`${this.name} received notification: State updated!`);
    }
  }
  
  // Example Usage
  const subject = new Subject();
  const observer1 = new Observer("Observer 1");
  const observer2 = new Observer("Observer 2");
  
  subject.addObserver(observer1);
  subject.addObserver(observer2);
  
  subject.notifyObservers();
  // Output:
  // Observer 1 received notification: State updated!
  // Observer 2 received notification: State updated!

