# React Redux Polyfill (Basic Implementation)

## Overview
Redux is a predictable state container for JavaScript applications. This polyfill demonstrates a basic implementation of Redux's core functionality, including the store, actions, reducers, and subscription mechanism. Understanding this helps grasp how Redux works internally.

## Basic Store Implementation

```javascript
function createStore(reducer, initialState) {
  let state = initialState;
  let subscribers = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    subscribers.forEach((subscriber) => subscriber());
  };

  const subscribe = (subscriber) => {
    subscribers.push(subscriber);
    return () => {
      subscribers = subscribers.filter((sub) => sub !== subscriber);
    };
  };

  return { getState, dispatch, subscribe };
}
```

## Reducer Example

```javascript
// Example reducer
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}
```

## Usage

```javascript
// Create store
const store = createStore(counterReducer, { count: 0 });

// Subscribe to store updates
const unsubscribe = store.subscribe(() => {
  console.log("Updated State:", store.getState());
});

// Dispatch actions
store.dispatch({ type: "INCREMENT" }); // 1
store.dispatch({ type: "INCREMENT" }); // 2
store.dispatch({ type: "INCREMENT" }); // 3
store.dispatch({ type: "DECREMENT" }); // 2

// Unsubscribe
unsubscribe();
```

## Enhanced Implementation

### With Middleware Support
```javascript
function createStore(reducer, initialState, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer, initialState);
  }
  
  let state = initialState;
  let subscribers = [];
  let isDispatching = false;

  const getState = () => {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing');
    }
    return state;
  };

  const dispatch = (action) => {
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions');
    }
    
    try {
      isDispatching = true;
      state = reducer(state, action);
    } finally {
      isDispatching = false;
    }
    
    subscribers.forEach((subscriber) => subscriber());
    return action;
  };

  const subscribe = (subscriber) => {
    if (typeof subscriber !== 'function') {
      throw new Error('Expected subscriber to be a function');
    }
    
    subscribers.push(subscriber);
    
    return () => {
      const index = subscribers.indexOf(subscriber);
      if (index > -1) {
        subscribers.splice(index, 1);
      }
    };
  };

  // Initialize state
  dispatch({ type: '@@INIT' });

  return { getState, dispatch, subscribe };
}
```

## Best Practices

1. **Immutable Updates**: Always return new state objects
2. **Pure Reducers**: Reducers should be pure functions
3. **Action Types**: Use constants for action types
4. **Middleware**: Use middleware for async operations
5. **Selectors**: Use selectors for derived state
