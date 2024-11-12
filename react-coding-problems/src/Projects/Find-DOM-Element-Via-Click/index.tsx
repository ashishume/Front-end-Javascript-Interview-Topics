import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import styled from "styled-components";

const FindDomMethodViaClick = () => {
  const [comments, setComments] = useState<{ [key: string]: string }>({});

  const [domStore, setDomStore] = useState<any[]>([]);

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

  // Debounce function to limit resize event handling
  const debounce = (func: () => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(func, delay);
    };
  };

  // Add a click event listener to the document
  document.addEventListener("click", function (event) {
    const { target, clientX, clientY } = event;

    // Calculate path and element position
    const path = getDomPath(target);
    const rect = (target as HTMLElement).getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;

    // Add unique item to domStore if it doesn't already exist
    setDomStore((prevArray) => {
      const existingPaths = prevArray.map((item) => item.path);
      if (!existingPaths.includes(path)) {
        return [
          ...prevArray,
          {
            uuid: uuidv4(),
            path,
            position: { x: relativeX, y: relativeY },
            elementRect: { top: rect.top, left: rect.left }, // Store the element's bounding box for recalculation
          },
        ];
      }
      return prevArray;
    });
  });

  console.log(domStore);

  // Function to handle comment submission
  const handleCommentSubmit = (uuid: string) => {
    console.log(`Comment for ${uuid}: ${comments[uuid]}`);
    // You can add logic to save or process the comment here
  };

  return (
    <Container>
      <Header>
        <h1>Thumbnail Gallery</h1>
      </Header>

      <Gallery>
        {Array.from({ length: 4 }).map((_, index) => (
          <Thumbnail key={index}>
            <img
              src={`https://via.placeholder.com/200?text=Image+${index + 1}`}
              alt={`Image ${index + 1}`}
            />
          </Thumbnail>
        ))}
      </Gallery>

      <ButtonGroup>
        <Button>View More</Button>
        <Button>Subscribe</Button>
        <Button>Contact Us</Button>
      </ButtonGroup>

      {[...domStore].map((item: any) => (
        <Bubble
          key={item.uuid}
          style={{
            top: item.position.y + item.elementRect.top,
            left: item.position.x + item.elementRect.left,
          }}
          data-path={item.path}
        >
          <CommentBox>
            <input
              type="text"
              value={comments[item.uuid] || ""}
              onChange={(e) =>
                setComments((prevComments) => ({
                  ...prevComments,
                  [item.uuid]: e.target.value,
                }))
              }
              placeholder="Add a comment"
            />
            <button onClick={() => handleCommentSubmit(item.uuid)}>Send</button>
          </CommentBox>
        </Bubble>
      ))}
    </Container>
  );
};

// Styled components
const Container = styled.div`
  max-width: 1000px;
  width: 90%;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
`;

const Header = styled.header`
  margin-bottom: 20px;

  h1 {
    font-size: 2rem;
    color: #333;
  }
`;

const Gallery = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const Thumbnail = styled.div`
  flex: 1 1 200px;
  max-width: 200px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const Bubble = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #25a5d9;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  &:hover > div {
    opacity: 1;
    visibility: visible;
  }
`;

// CommentBox styled component
const CommentBox = styled.div`
  position: absolute;
  top: -60px;
  left: 0;
  transform: translateX(-50%);
  padding: 8px;
  background-color: black;
  color: white;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;
  pointer-events: none;
  z-index: 100;
  width: 150px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  input {
    padding: 4px;
    font-size: 12px;
    color: black;
    border-radius: 3px;
    border: none;
    outline: none;
  }

  button {
    padding: 4px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
  }
`;

export default FindDomMethodViaClick;
