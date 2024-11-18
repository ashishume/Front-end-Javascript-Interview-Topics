import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import styled from "styled-components";

const FindDomMethodViaClick = () => {
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [domStore, setDomStore] = useState<any[]>([]);
  const [selectedBubble, setSelectedBubble] = useState<string | null>(null);
  const [commentHistory, setCommentHistory] = useState<{
    [key: string]: Array<{ text: string; timestamp: Date }>;
  }>({});
  const [newComment, setNewComment] = useState("");

  // DOM path finder function remains the same
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
      if ((event.target as HTMLElement).closest(".comment-sidebar")) {
        return; // Ignore clicks within the sidebar
      }

      const target = event.target as HTMLElement;
      const path = getDomPath(target);
      const rect = target.getBoundingClientRect();

      const relativeX = event.clientX - rect.left;
      const relativeY = event.clientY - rect.top;
      const initialPosition = calculateBubblePosition(
        target,
        relativeX,
        relativeY
      );

      setDomStore((prevArray) => {
        const existingPaths = prevArray.map((item) => item.path);
        if (!existingPaths.includes(path)) {
          const newBubbleId = uuidv4();
          setCommentHistory((prev) => ({ ...prev, [newBubbleId]: [] }));
          return [
            ...prevArray,
            {
              uuid: newBubbleId,
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

    // Position update logic remains the same
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

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateBubblePositions, 100);
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", updateBubblePositions);
    window.addEventListener("orientationchange", updateBubblePositions);

    const observer = new MutationObserver(updateBubblePositions);
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

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

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBubble || !newComment.trim()) return;

    setCommentHistory((prev) => ({
      ...prev,
      [selectedBubble]: [
        ...(prev[selectedBubble] || []),
        { text: newComment, timestamp: new Date() },
      ],
    }));
    setNewComment("");
  };

  const handleBubbleClick = (uuid: string) => {
    setSelectedBubble((prevId) => (prevId === uuid ? null : uuid));
  };

  return (
    <MainContainer>
      <ContentContainer isSidebarOpen={!!selectedBubble}>
        <Container>
          <Header>
            <h1>Thumbnail Gallery</h1>
          </Header>

          <Gallery>
            {Array.from({ length: 4 }).map((_, index) => (
              <Thumbnail key={index}>
                <img
                  src={`https://via.placeholder.com/200?text=Image+${
                    index + 1
                  }`}
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
              isSelected={selectedBubble === item.uuid}
              onClick={() => handleBubbleClick(item.uuid)}
            />
          ))}
        </Container>
      </ContentContainer>

      <CommentSidebar className="comment-sidebar" isOpen={!!selectedBubble}>
        <SidebarHeader>
          <h2>Comments</h2>
          <CloseButton onClick={() => setSelectedBubble(null)}>×</CloseButton>
        </SidebarHeader>

        <CommentsContainer>
          {selectedBubble &&
            commentHistory[selectedBubble]?.map((comment, index) => (
              <CommentBubble key={index}>
                <CommentText>{comment.text}</CommentText>
                <CommentTime>
                  {comment.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </CommentTime>
              </CommentBubble>
            ))}
        </CommentsContainer>

        <CommentForm onSubmit={handleCommentSubmit}>
          <CommentInput
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type your comment..."
          />
          <SendButton type="submit">Send</SendButton>
        </CommentForm>
      </CommentSidebar>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

const ContentContainer = styled.div<{ isSidebarOpen: boolean }>`
  flex: 1;
  transition: margin-right 0.3s ease;
  margin-right: ${(props) => (props.isSidebarOpen ? "300px" : "0")};
`;

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

const CommentSidebar = styled.div<{ isOpen: boolean }>`
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100vh;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 1.2rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const CommentsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CommentBubble = styled.div`
  background-color: #f0f0f0;
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 85%;
  align-self: flex-start;
`;

const CommentText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #333;
`;

const CommentTime = styled.span`
  font-size: 11px;
  color: #666;
  display: block;
  margin-top: 4px;
`;

const CommentForm = styled.form`
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #25a5d9;
  }
`;

const SendButton = styled.button`
  background-color: #25a5d9;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1e8ab0;
  }
`;

const BubbleContainer = styled.div<{ isSelected: boolean }>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.isSelected ? "#1e8ab0" : "#25a5d9")};
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 1000;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1e8ab0;
  }
`;

// Remaining styled components (Header, Gallery, Thumbnail, ButtonGroup, Button) stay the same
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

  &:hover {
    transform: scale(1.05);
  }

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

export default FindDomMethodViaClick;
