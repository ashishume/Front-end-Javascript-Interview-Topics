  React FIBER: https://medium.com/@navnit0707/how-react-works-behind-the-scene-a-detailed-explanation-of-loading-a-ui-on-screen-by-react-ccd62e27f631
  Diffing Algorithm: https://www.geeksforgeeks.org/what-is-diffing-algorithm/

- React fiber is an engine which runs the react under the hood

-> before react 16 it had stack reconciler
-> after React 16 its react fiber

React Fiber is an internal implementation detail of the React library. It's a complete reimplementation 
of the core algorithm used by React to reconcile the virtual DOM and update the actual DOM efficiently. 
The main goals of React Fiber include better performance, improved developer experience, and the ability 
to enable new features like async rendering.

### 1. **Stack Reconciliation (Old Algorithm):**
   - React used a recursive process for rendering and updating the virtual DOM.
   - It operated on a single call stack, which meant that the entire reconciliation process had to 
   complete before yielding to the browser, potentially causing performance issues and jank in the UI.

### 2. **Fiber Architecture (New Algorithm):**
   - Reconciliation algorithm using a new architecture called "fiber."
   - It breaks down the reconciliation process into smaller, interruptible units of work, allowing React 
   to pause and resume work as needed.
   - The term "fiber" refers to these individual units of work.

### **Differences:**
   
- **Concurrency:** 
   React Fiber introduces the concept of concurrency, enabling React to work on 
   different tasks concurrently without blocking the main thread. This helps in creating more responsive user interfaces.
   

- **Incremental Rendering:** 
   Fiber allows for incremental rendering, where React can work on 
   rendering parts of the virtual DOM without completing the entire process in one go. This is particularly
    beneficial for large and complex applications.

- **Prioritization:** 
   Fiber introduces the ability to prioritize different types of updates.
    It can schedule high-priority updates (e.g., user interactions) ahead of low-priority updates,
     improving perceived performance.

- **Error Boundaries:** 
   Fiber improves error handling and provides better support for error 
   boundaries, making it easier for developers to capture and handle errors within components.

### **Why Fiber was Introduced:**
   - **Improved Performance:** 
      The main motivation behind React Fiber is to improve the performance
    of React applications, making them more efficient and responsive.
   
    - **Concurrency:** 
      Concurrency allows React to better utilize resources, preventing the UI
    from freezing during heavy computation or rendering tasks.
   
    - **Better Developer Experience:** 
   Fiber's architecture makes it easier for developers 
   to work on the codebase and introduces features like time-slicing, enabling smoother animations and interactions.
   
   - **Preparation for the Future:** 
   React Fiber is designed to be more extensible, making 
   it easier for React to evolve and adopt new features and optimizations in the future.

In summary, React Fiber is a significant internal rewrite of React's core reconciliation 
algorithm, introducing a more flexible and efficient architecture to handle rendering and updates in
 a concurrent and prioritized manner. This helps React applications perform better, especially in 
 complex scenarios, and prepares the library for future enhancements.

