// polyfill-react-redux.js

function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      listeners = listeners.filter((m) => m !== listener);
    };
  }

  dispatch({ type: "@@redux/INIT" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

function connect(mapStateToProps, mapDispatchToProps) {
  return function wrapWithConnect(Component) {
    return class ConnectedComponent extends React.Component {
      componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const { store } = this.context;
        const state = store.getState();
        const stateProps = mapStateToProps(state);
        const dispatchProps = mapDispatchToProps(store.dispatch);
        return <Component {...this.props} {...stateProps} {...dispatchProps} />;
      }
    };
  };
}

// You can use this polyfill as follows:
// const store = createStore(yourReducer, yourInitialState);
// const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(YourComponent);
// ReactDOM.render(<ConnectedComponent store={store} />, document.getElementById('root'));
