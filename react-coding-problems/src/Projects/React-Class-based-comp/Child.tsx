import { Button } from "@/components/ui/button";
import { Component } from "react";

interface ChildProps {
  // Add any props if needed
}

interface ChildState {
  counter: number;
}

class Child extends Component<ChildProps, ChildState> {
  constructor(props: ChildProps) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  counter() {
    this.setState((prevState: ChildState) => ({
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
