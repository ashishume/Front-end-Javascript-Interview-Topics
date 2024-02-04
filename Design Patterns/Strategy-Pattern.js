/**
 
- The Strategy Pattern is a behavioral design pattern that defines a family of algorithms, 
encapsulates each algorithm, and makes them interchangeable. 

- It allows the client to choose an algorithm from a family of algorithms at runtime, 
making it possible to select and change the behavior of a class without altering its source code. 

- The pattern involves defining a set of algorithms, encapsulating each algorithm in a separate class, 
and making the classes interchangeable.
 */


/**
 * Example Scenario:
  Imagine you have a text editor application with a text formatting feature. 
  You can have different formatting strategies like bold, italic, and underline. 
  Users can dynamically choose the formatting strategy they want to apply to the text.
  The Strategy Pattern allows you to encapsulate each formatting strategy in a separate 
  class and switch between them at runtime, providing a flexible and extensible solution.
 */

class SortingStrategy {
  sort(data) {
    // Abstract method for sorting
  }
}

// Concrete Strategies
class BubbleSortStrategy extends SortingStrategy {
  sort(data) {
    console.log("Sorting using bubble sort");
    // Implementation of bubble sort
    return data.sort((a, b) => a - b);
  }
}

class QuickSortStrategy extends SortingStrategy {
  sort(data) {
    console.log("Sorting using quick sort");
    // Implementation of quick sort
    return data.sort((a, b) => a - b);
  }
}

/** sort context can be used to change the sorting strategy dyanmically at the runtime */
class SortContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  executeStrategy(data) {
    return this.strategy.sort(data);
  }
}

// Example Usage
const dataToSort = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
const context = new SortContext(new BubbleSortStrategy());

console.log("Original Data:", dataToSort);

const sortedDataBubbleSort = context.executeStrategy([...dataToSort]);
console.log("Sorted Data using Bubble Sort:", sortedDataBubbleSort);

context.setStrategy(new QuickSortStrategy());
const sortedDataQuickSort = context.executeStrategy([...dataToSort]);
console.log("Sorted Data using Quick Sort:", sortedDataQuickSort);
