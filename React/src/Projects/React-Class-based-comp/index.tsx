import React, { Component } from "react";
import ErrorBoundary from "./ErrorBoundary";
import Child from "./Child";
interface YourComponentState {
  posts: {
    id: number;
    title: string;
  }[];
  hasError: boolean;
}

// Follow this link for life cycle order:
// https://i2.wp.com/programmingwithmosh.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-31-at-1.44.28-PM.png?ssl=1
export class ParentClassComponent extends Component<{}, YourComponentState> {
  constructor(props: ParentClassComponent) {
    console.log("constructor");

    super(props);
    this.state = {
      posts: [],
      hasError: false,
    };
  }

  async componentDidMount() {
    console.log("did mount");
    try {
      // setInterval(async () => {
      const res = await (
        await fetch("https://jsonplaceholder.typicode.com/posts")
      ).json();

      this.setState({
        posts: res,
      });
      throw new Error("");
    } catch (e) {}
    // }, 3000);
  }

  static getDerivedStateFromProps(props: any, state: any) {
    console.log("getDerivedStateFromProps", props, state);
    return null;
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<YourComponentState>,
    snapshot?: any
  ): void {
    console.log("did update");
  }
  componentWillUnmount() {
    console.log("unmounted");
  }

  shouldComponentUpdate() {
    console.log("should update");
    return true;
  }

  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    console.log("snapshot before update");
    return null;
  }

  /** error handlers lifecycles */
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log("error");
  }

  render() {
    console.log("render");
    return (
      <ErrorBoundary>
        <Child />
        {this.state.posts.map((value) => {
          return <div key={value.id}>{value.title}</div>;
        })}
      </ErrorBoundary>
    );
  }
}

export default ParentClassComponent;
