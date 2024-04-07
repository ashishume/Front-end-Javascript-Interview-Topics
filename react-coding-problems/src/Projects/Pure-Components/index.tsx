import { PureComponent } from "react";
/**
 * 
PureComponent: PureComponent is a class component that automatically implements a 
shallow comparison of props and state in its shouldComponentUpdate method. 
This prevents the component from re-rendering if its props and state have not changed, 
which can improve performance.
 */
export class PureClassBasedComponent extends PureComponent {
  render() {
    return (
      <div>
        pure components
      </div>
    );
  }
}

export default PureClassBasedComponent;
