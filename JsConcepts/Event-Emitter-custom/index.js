class MyCustomEmitter {
  constructor() {
    this._events = {};
  }

  on(name, listener) {
    if (!this._events[name]) {
      this._events = [];
    }
    this._events[name].push(listener);
  }

  removeListener(name, listnerToRemove) {
    if (!this._events[name]) {
      throw new Error(`Cant remove a listener, Event ${name} doesnt exist`);
    }

    this._events[name] = this._events[name].filter(
      (listener) => listener !== listnerToRemove
    );
  }

  emit(name, data) {
    if (!this._events[name]) {
      throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
    }
    this._events[name].forEach((callback) => callback(data));
  }
}
