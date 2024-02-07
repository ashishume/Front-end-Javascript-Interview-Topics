const combineReducers = (reducers) => {
  // the return value should be reducer as well
  // so it's a function that returns other function
  return (state = {}, action) => {
    // Object.keys gives all the keys of the reducers object (the argument above)
    // in our case these are `todos` and `filter`
    return Object.keys(reducers).reduce(
      // we call reduce to get a single value
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
        // so nextState will look like:
        // {todos:...,filter:...}
      },
      {}
    ); // start reduce with an empty object
  };
};
