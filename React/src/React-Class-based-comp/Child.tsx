import React, { Component } from "react";

class Child extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  counter() {
    this.setState((prevState: any) => ({
      counter: prevState.counter + 1,
    }));
  }
  render() {
    if (this.state.counter === 3) {
      throw new Error("");
    } else {
      return (
        <div>
          <button onClick={this.counter.bind(this)}>
            Counter{this.state.counter}
          </button>
        </div>
      );
    }
  }
}

export default Child;
