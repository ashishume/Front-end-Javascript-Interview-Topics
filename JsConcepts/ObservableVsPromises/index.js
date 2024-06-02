/* Differences between Observables and Promises */
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Resolved!");
  }, 1000);
});

promise.then((value) => console.log(value)); // Logs "Resolved!" after 1 second
// ---------------------------------------------------------------------

/** observable code example */
const { Observable } = require('rxjs');
let observable = new Observable(subscriber => {
    let count = 0;
    const intervalId = setInterval(() => {
        subscriber.next(count++);
    }, 1000);

    return () => {
        clearInterval(intervalId);
    };
});
const subscription = observable.subscribe(value => console.log(value)); 
setTimeout(() => subscription.unsubscribe(), 5000);  

/**
 * 
1. Promise: Represents a single value that may be available now, or in the future, or never. Once a promise resolves or rejects, it cannot change.

Observable: Can emit multiple values over time. It can emit zero or more values and may continue indefinitely.


2. Promise: Starts executing immediately upon creation.
   
Observable: Does not start emitting values until it is subscribed to.


3. Promise: Once started, a promise cannot be cancelled.
   
Observable: Subscriptions to an observable can be cancelled, allowing for cleanup and prevention of memory leaks.

4. Promise: Limited in terms of chaining and transformation. You can chain .then()   and .catch() but it’s not as powerful as RxJS operators.   
    
Observable: RxJS provides a rich set of operators for transforming, filtering, and composing observables.


Q. why angular chose observables over promises?
Angular embraces reactive programming principles, where you can work with streams of data and events. Observables are a core part of reactive programming, offering powerful operators for handling complex data flows.

*/
