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
