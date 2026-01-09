import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";

const VirtualList = () => {
  const ITEM_HEIGHT = 80;
  const VIEWPORT_HEIGHT = 600;
  const BUFFER = 3;
  const [scrollTop, setScrollTop] = useState(0);

  const ref = useRef(null);
  const { data } = useQuery({
    queryKey: ["fetch-virtual"],
    queryFn: () => {
      return axios
        .get("https://jsonplaceholder.typicode.com/photos")
        .then((r) => r.data);
    },
  });

  //Per item height * total items = total height of the list
  const totalHeight = ITEM_HEIGHT * data?.lenth;

  //start index is the index of the first item that is visible in the viewport
  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);

  //end index is the index of the last item that is visible in the viewport
  const endIndex = Math.min(
    data?.length - 1,
    Math.ceil((scrollTop + VIEWPORT_HEIGHT) / ITEM_HEIGHT) + BUFFER
  );

  //visible items are the items that are visible in the viewport
  const visibleItems = data?.slice(startIndex, endIndex + 1);

  //offset y is the y position of the first item that is visible in the viewport
  const offsetY = startIndex * ITEM_HEIGHT;

  const handleScoll = (e) => {
    setScrollTop(e.target.scrollTop);
  };
  return (
    <div
      ref={ref}
      onScroll={handleScoll}
      className="overflow-auto"
      style={{
        height: `${VIEWPORT_HEIGHT}px`,
      }}
    >
      <div
        style={{
          height: `${totalHeight}px`,
          position: "relative",
        }}
      >
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
          }}
        >
          {visibleItems?.map((value) => {
            return (
              <div
                key={value.id}
                className="border h-20 m-1 rounded p-2 w-full"
                style={{
                  height: `${ITEM_HEIGHT}px`,
                }}
              >
                <p>{value.id}</p>
                {value.title}
                {value.url}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
