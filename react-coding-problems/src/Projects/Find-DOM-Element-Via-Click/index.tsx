import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
const FindDomMethodViaClick = () => {
  const [domStore, setDomStore] = useState(new Set());
  // DOM path finder function
  function getDomPath(element: any) {
    if (!element) return "";

    let path = "";

    while (element.nodeType === Node.ELEMENT_NODE) {
      let selector = element.nodeName.toLowerCase();

      // If the element has an ID, use it and stop traversal
      if (element.id) {
        selector += `#${element.id}`;
        path = `${selector} ${path}`.trim();
        break;
      }

      // Add classes if any
      if (element.className) {
        selector += "." + Array.from(element.classList).join(".");
      }

      // Add nth-child if it's not the only child
      let sibling = element;
      let nth = 1;
      while ((sibling = sibling.previousElementSibling) != null) {
        if (sibling.nodeName === element.nodeName) nth++;
      }
      if (nth > 1) {
        selector += `:nth-of-type(${nth})`;
      }

      path = `${selector} ${path}`.trim();
      element = element.parentNode;
    }

    return path;
  }
  // Store the previously clicked element
  let previousElement: any = null;

  // let domPathStore = new Set();
  // Add a click event listener to the document
  document.addEventListener("click", function (event) {
    const path = getDomPath(event.target); // Get the DOM path of the clicked element

    // add new unique item to the store
    setDomStore((prevSet) => {
      // Convert Set to Array to check for duplicate paths
      const existingPaths = Array.from(prevSet).map((item: any) => item.path);
      // Only add if path does not already exist
      if (!existingPaths.includes(path)) {
        const newSet = new Set(prevSet);
        newSet.add({ uuid: uuidv4(), path });
        return newSet;
      }
      // If path exists, return previous Set without modification
      return prevSet;
    });

    // Remove the highlight from the previous element
    if (previousElement) {
      previousElement.style.outline = "";
    }
    // Highlight the clicked element with a border
    (event as any).target.style.outline = "2px solid red";
    // Store the current element as the previous one for the next click
    previousElement = event.target;
  });

  let prevEl: any = null;
  const handleUuid = (e: any, uuid: string) => {
    const a: any = Array.from(domStore).find((item: any) => item.uuid === uuid);
    const element = document.querySelector(a.path); // Use the path to find the element

    if (prevEl) {
      prevEl.style.outline = "";
    }
    element.style.outline = "2px solid red";

    prevEl = element;
  };

  return (
    <div className="container" id="page-container">
      <header className="header" id="header">
        <h1>DOM Structure</h1>
        <nav className="menu">
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="container">
        <aside className="sidebar" id="sidebar">
          <div className="widget">
            <h2>Widget 1</h2>
            <ul className="item-list">
              <li className="item">Item 1</li>
              <li className="item">Item 2</li>
              <li className="item">Item 3</li>
            </ul>
          </div>
          <div className="widget">
            <h2>Widget 1</h2>
            <ul className="item-list">
              <li className="item">Item 1</li>
              <li className="item">Item 2</li>
              <li className="item">Item 3</li>
            </ul>
          </div>
          <div className="widget" id="widget-2">
            <h2>Widget 2</h2>
            <div className="box" id="box-1">
              <p>Box 1 content</p>
              <div className="nested-box">
                <span>Nested Box 1</span>
                <span>Nested Box 2</span>

                <button type="button" style={{ backgroundColor: "gray" }}>
                  <span>
                    Submit
                    <img
                      width="50"
                      height="50"
                      src="https://static.vecteezy.com/system/resources/thumbnails/009/652/218/small/magnifying-glass-icon-isolated-on-white-background-search-illustration-vector.jpg"
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        <section className="main-content" id="main-content">
          <article className="article" id="article-1">
            <h2>Article 1</h2>
            <p>This is the first article.</p>
            <div className="comments">
              <div className="comment" id="comment-1">
                <p>User 1: This is a comment.</p>
              </div>
              <div className="comment" id="comment-2">
                <p>User 2: Another comment.</p>
              </div>
            </div>
          </article>

          <article className="article" id="article-2">
            <h2>Article 2</h2>
            <p>This is the second article with more nested elements.</p>
            <div className="nested-content">
              <div className="level-1">
                <div className="level-2">
                  <div className="level-3">
                    <p>Deeply nested content here</p>
                    <div className="deep-box" id="deep-box">
                      <p>Deeper content inside a box</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>

      <footer className="footer" id="footer">
        <p>
          Footer content with{" "}
          <span className="small-print">small print text</span>.
        </p>
      </footer>

      <ul>
        {Array.from(domStore).map((value: any) => {
          return (
            <li key={value.uuid} onClick={(e) => handleUuid(e, value.uuid)}>
              {value.uuid}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FindDomMethodViaClick;
