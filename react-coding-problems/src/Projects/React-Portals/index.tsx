/**
  React Portals provide a way to render children components into a DOM node that exists outside the hierarchy of the parent component. This is particularly useful when you want to render a component at a different place in the DOM tree, 
  like MODALS, TOOLTIPS, or POPOVERS, without breaking the parent's layout or styles. Here's a brief explanation along with a code example:

 */

import ReactDOM from "react-dom";

const Modal = ({ children }: any) => {
  return ReactDOM.createPortal(
    children,
    document.getElementById("modal-root") as any 
    // Render the children into this DOM node
  );
};

const ReactPortal = () => {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <Modal>
        <div>
          <h2>This is a modal!</h2>
          <p>You can render anything here.</p>
        </div>
      </Modal>
    </div>
  );
};

export default ReactPortal;
