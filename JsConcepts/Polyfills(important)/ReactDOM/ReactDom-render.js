const json = {
  type: "div",
  props: { id: "hello", class: "foo" },
  children: [
    { type: "h1", children: "HELLO" },
    { type: "p", children: [{ type: "span", props: { class: "bar" }, children: "World" }] },
  ],
};

function ReactDom(domObj, entry) {
  const helper = (domObj) => {
    const { type, props, children } = domObj;

    const element = document.createElement(type);

    if (props) {
      for (let property in props) {
        element[property] = props[property];
      }
    }

    if (typeof children === "string") {
      element.innerText = children;
    } else {
      const fragment = document.createDocumentFragment();
      for (let child of children) {
        fragment.appendChild(helper(child));
      }
      element.appendChild(fragment);
    }
    return element;
  };

  const generatedDom = helper(domObj);
  entry.appendChild(generatedDom);
}

ReactDom(json, document.getElementById("root"));
