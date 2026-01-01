import { forwardRef, useEffect, useRef, useState } from "react";
import useDebouce from "./use-debounce";
import useSearchQuery from "./use-search";
import useFetchUsers from "./use-fetch-users";

const SearchWithVirtualisation = () => {
  const limit = 50;
  const [skip, setSkip] = useState(0);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedValue = useDebouce(query);
  const { searchData } = useSearchQuery(debouncedValue);
  const { isLoading, data, error } = useFetchUsers(hasMore, limit, skip);

  useEffect(() => {
    if (data?.users && !searchData) {
      if (skip === 0) {
        setAllUsers(data?.users);
      } else {
        setAllUsers((prev) => [...prev, ...data?.users]);
        const total = data?.total;
        const currentTotal = data?.users?.length + skip;
        setHasMore(currentTotal < total);
        setIsLoadingMore(false);
      }
    }
  }, [skip, data]);

  const handleReachBottom = () => {
    if (!isLoading && !isLoadingMore && hasMore && data) {
      setIsLoadingMore(true);
      setSkip((prev) => prev + limit);
    }
  };

  const handleChange = (e: any) => {
    if (e.target.value) {
      setQuery(e.target.value);
    }
  };

  useEffect(() => {
    if (searchData?.users) {
      setAllUsers(searchData?.users);
    }
  }, [skip, searchData]);

  return (
    <>
      <div className="p-2 m-1">
        <input
          placeholder="search..."
          className="p-1"
          onChange={handleChange}
        />
      </div>
      <BotttomTrigger onReachBottom={handleReachBottom}>
        {isLoading && skip === 0 && <div>Loading...</div>}
        {error && <div>Error loading users</div>}
        <div className="p-2 m-1">
          {allUsers?.map((user: any) => (
            <div key={user.id}>{user.firstName}</div>
          ))}
          {isLoadingMore && !searchData && <div>Loading more...</div>}
          {!hasMore && allUsers.length > 0 && (
            <div className="text-center p-4">No more users to load</div>
          )}
        </div>
      </BotttomTrigger>
    </>
  );
};

const BotttomTrigger = forwardRef<
  HTMLDivElement,
  { onReachBottom?: () => void; children: React.ReactNode }
>(({ onReachBottom, children }, ref) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current || !onReachBottom) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onReachBottom();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [onReachBottom]);

  return (
    <div ref={ref}>
      {children}
      <div ref={sentinelRef} style={{ height: "1px" }} />
    </div>
  );
});

BotttomTrigger.displayName = "BotttomTrigger";

export default SearchWithVirtualisation;
