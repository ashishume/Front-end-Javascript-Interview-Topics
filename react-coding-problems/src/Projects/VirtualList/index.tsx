import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, type UIEvent } from "react";

const ITEM_HEIGHT = 80;
const VIEWPORT_HEIGHT = 600;
const BUFFER = 3;

type Photo = {
  id: number;
  title: string;
  url: string;
};

const VirtualList = () => {
  const [scrollTop, setScrollTop] = useState(0);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["fetch-virtual"],
    queryFn: () =>
      axios
        .get<Photo[]>("https://jsonplaceholder.typicode.com/photos")
        .then((r) => r.data),
    staleTime: 60_000,
  });

  const count = data?.length ?? 0;

  // Per item height * total items = total height of the list
  const totalHeight = ITEM_HEIGHT * count;

  // start index is the index of the first item that is visible in the viewport
  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);

  // end index is the index of the last item that is visible in the viewport
  const endIndex =
    count > 0
      ? Math.min(
          count - 1,
          Math.ceil((scrollTop + VIEWPORT_HEIGHT) / ITEM_HEIGHT) + BUFFER
        )
      : -1;

  // visible items are the items that are visible in the viewport
  const visibleItems =
    data && count > 0 && endIndex >= startIndex
      ? data.slice(startIndex, endIndex + 1)
      : [];

  // offset y is the y position of the first item that is visible in the viewport
  const offsetY = startIndex * ITEM_HEIGHT;

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  if (isPending) {
    return <p className="p-4 text-neutral-600">Loading photos…</p>;
  }

  if (isError) {
    return (
      <p className="p-4 text-red-600" role="alert">
        {error instanceof Error ? error.message : "Failed to load photos."}
      </p>
    );
  }

  return (
    <div
      onScroll={handleScroll}
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
          {visibleItems.map((value) => {
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
