import { useEffect, useRef, useState } from "react";
import "./infinite-scroll-2.scss";
// import { Spinner } from "react-bootstrap";
import data from "./chatData.json";
import { Loader } from "lucide-react";

const InfiniteScroll = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [currentChat, setCurentChat] = useState("");
  const [showChat, setShowChat] = useState(false);
  const inputRef = useRef(null as any);
  const containerRef = useRef(null as any);
  const [chatList, setChatList] = useState([] as any);
  const [index, setIndex] = useState(null as any);

  useEffect(() => {
    /** focus the input field on load */
    if (inputRef?.current) {
      inputRef.current.focus();
    }

    // delay the mock api call
    setTimeout(() => {
      setChatList(data.data);
    }, 1000);

    setLoading(true);

    /** add event listener for scroll */
    window.addEventListener("scroll", handleScroll);
    /** call the method immediately (IIFEs)*/
    makeApiCall();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  function handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      // User has scrolled to the bottom, make API call
      setPageNumber((prev) => prev + 1);
    }
  }

  function handleChange(e: any) {
    setCurentChat(e.target.value);
  }

  function sendChat() {
    let newChat = {
      id: Math.floor(Math.random() * 1000),
      text: currentChat,
      sentBy: "CurrentUserId", // we can replace this with current logged in userID
      receivedAt: new Date(),
    };
    setChatList((prev: any) => [...prev, { ...newChat }]);

    /** mock the delay receiver's message */
    setTimeout(() => {
      let randomNewChat = {
        id: Math.floor(Math.random() * 1000),
        text: currentChat + " " + currentChat,
        sentBy: "Ashish",
        receivedAt: new Date(),
      };

      setChatList((prev: any) => [...prev, { ...randomNewChat }]);
    }, 1000);

    // clear the input field
    setCurentChat("");
  }

  /** make api call */
  async function makeApiCall() {
    const response = await fetch(
      `https://5e217fb26867a0001416f3e8.mockapi.io/employee?page=${page}&limit=10`
    );
    const newData = await response.json();
    setLoading(false);
    await setProducts((prevData) => [...prevData, ...newData]);

    /** hide the chat when more api is called */
    setShowChat(false);
  }

  function openChatWindow(product: any) {
    setShowChat(true);
    setIndex(product.id);
  }

  return (
    <>
      <div className="infinite-scroll-container">
        <div className="scroll-content">
          {products &&
            products.map((product) => {
              return (
                <div
                  key={product.id}
                  className={`item ${product.id === index ? "activeItem" : ""}`}
                  onClick={() => openChatWindow(product)}
                >
                  {product.firstName} {product.lastName}
                </div>
              );
            })}
          <div>{loading ? <Loader /> : null}</div>
        </div>
        {showChat ? (
          <div className="chatbot-container" ref={containerRef}>
            <div className="chat-content">
              {chatList?.length ? (
                chatList.map((value: any) => {
                  return (
                    <div
                      key={value.id}
                      className={`chat-bubble ${
                        value?.sentBy === "CurrentUserId" ? "received-chat" : ""
                      }`}
                    >
                      {value.text}
                    </div>
                  );
                })
              ) : (
                <Spinner />
              )}
              <div className="chat-input-field">
                <input
                  type="text"
                  ref={inputRef}
                  value={currentChat}
                  placeholder="start typing here..."
                  onChange={handleChange}
                />
                <button disabled={!currentChat?.length} onClick={sendChat}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default InfiniteScroll;
