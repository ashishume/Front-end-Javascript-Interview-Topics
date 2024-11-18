import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
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
      if (element.id) {
        selector += `#${element.id}`;
        path = `${selector} ${path}`.trim();
        break;
      }
      if (element.className) {
        selector += "." + Array.from(element.classList).join(".");
      }
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

  function calculateBubblePosition(
    element: Element,
    relativeX: number,
    relativeY: number
  ) {
    const rect = element.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    return {
      left: rect.left + relativeX + scrollX,
      top: rect.top + relativeY + scrollY,
    };
  }

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const path = getDomPath(target);
      const rect = target.getBoundingClientRect();

      // Calculate relative position within the clicked element
      const relativeX = event.clientX - rect.left;
      const relativeY = event.clientY - rect.top;

      // Calculate initial absolute position
      const initialPosition = calculateBubblePosition(
        target,
        relativeX,
        relativeY
      );

      setDomStore((prevArray) => {
        const existingPaths = prevArray.map((item) => item.path);
        if (!existingPaths.includes(path)) {
          return [
            ...prevArray,
            {
              uuid: uuidv4(),
              path,
              relativePosition: { x: relativeX, y: relativeY },
              style: {
                position: "absolute",
                left: `${initialPosition.left}px`,
                top: `${initialPosition.top}px`,
              },
            },
          ];
        }
        return prevArray;
      });
    };

    const updateBubblePositions = () => {
      setDomStore((prevArray) =>
        prevArray.map((item) => {
          const element = document.querySelector(item.path);
          if (element) {
            const newPosition = calculateBubblePosition(
              element,
              item.relativePosition.x,
              item.relativePosition.y
            );

            return {
              ...item,
              style: {
                position: "absolute",
                left: `${newPosition.left}px`,
                top: `${newPosition.top}px`,
              },
            };
          }
          return item;
        })
      );
    };

    // Debounced resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateBubblePositions, 100);
    };

    // Event listeners
    document.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", updateBubblePositions);
    window.addEventListener("orientationchange", updateBubblePositions);

    // Mutation observer for DOM changes
    const observer = new MutationObserver(updateBubblePositions);
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    // Initial position calculation
    updateBubblePositions();

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateBubblePositions);
      window.removeEventListener("orientationchange", updateBubblePositions);
      observer.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  const handleCommentSubmit = (uuid: string) => {
    console.log(`Comment for ${uuid}: ${comments[uuid]}`);
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

      {domStore.map((item) => (
        <BubbleContainer
          key={item.uuid}
          style={item.style}
          data-path={item.path}
        >
          <CommentBox>
            <Input
              type="text"
              value={comments[item.uuid] || ""}
              onChange={(e) =>
                setComments((prev) => ({
                  ...prev,
                  [item.uuid]: e.target.value,
                }))
              }
              placeholder="Add a comment"
            />
            <CommentButton onClick={() => handleCommentSubmit(item.uuid)}>
              Send
            </CommentButton>
          </CommentBox>
        </BubbleContainer>
      ))}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1000px;
  width: 90%;
  margin: 0 auto;
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

const BubbleContainer = styled.div`
  width: 20px;
  height: 20px;
  background-color: #25a5d9;
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 1000;

  &:hover {
    > div {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
  }
`;

const CommentBox = styled.div`
  position: absolute;
  top: -65px;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  padding: 8px;
  border-radius: 4px;
  width: 150px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  pointer-events: none;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Input = styled.input`
  padding: 4px;
  font-size: 12px;
  border: none;
  border-radius: 3px;
  width: 100%;
  outline: none;
`;

const CommentButton = styled.button`
  padding: 4px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export default FindDomMethodViaClick;
