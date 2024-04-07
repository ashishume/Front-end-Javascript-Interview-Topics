import { Button } from "@/components/ui/button";
import { Component } from "react";

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
          <Button onClick={this.counter.bind(this)}>
            Counter{this.state.counter}
          </Button>
        </div>
      );
    }
  }
}

export default Child;
